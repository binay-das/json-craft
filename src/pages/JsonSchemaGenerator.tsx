import { useState, useEffect } from 'react';
import { EditorPanel } from '../components/EditorPanel';


function generateSchema(value: unknown): any {
  if (value === null) {
    return { type: "null" };
  }

  if (Array.isArray(value)) {
    return {
      type: "array",
      items: value.length > 0 ? generateSchema(value[0]) : {}
    };
  }

  if (typeof value === "object") {
    const properties: Record<string, any> = {};
    const required: string[] = [];

    for (const [key, val] of Object.entries(value as Record<string, any>)) {
      properties[key] = generateSchema(val);
      required.push(key);
    }

    const schema: any = {
      type: "object",
      properties
    };

    if (required.length > 0) {
      schema.required = required;
    }

    return schema;
  }

  switch (typeof value) {
    case "string":
      return { type: "string" };

    case "number":
      return { type: "number" };

    case "boolean":
      return { type: "boolean" };

    default:
      return {};
  }
}

export default function JsonSchemaGenerator() {
  const [value, setValue] = useState<string>("{\n  \"name\": \"Alice\"\n}");
  const [outputValue, setOutputValue] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setError(null);
    if (!value.trim()) {
      setOutputValue("");
      return;
    }

    try {
      const parsed = JSON.parse(value);
      const schema = generateSchema(parsed);
      const finalSchema = {
        $schema: "http://json-schema.org/draft-07/schema#",
        ...schema
      };
      setOutputValue(JSON.stringify(finalSchema, null, 2));
    } catch (err) {
      setError(err instanceof Error ? `Invalid JSON: ${err.message}` : "Invalid JSON");
    }
  }, [value]);

  const handleEditorChange = (val: string | undefined) => {
    setValue(val || "");
  };

  return (
    <div className="flex flex-col gap-4">
      {error && (
        <div className="p-3 bg-red-100 text-red-700 border border-red-300 rounded-md text-sm">
          {error}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <EditorPanel
          value={value}
          onChange={handleEditorChange}
          language="json"
          label="JSON Input"
        />
        <EditorPanel
          value={outputValue}
          language="json"
          label="Generated Schema"
          readOnly
        />
      </div>
    </div>
  );
}
