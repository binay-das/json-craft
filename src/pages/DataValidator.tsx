import { useState, useEffect } from 'react';
import { EditorPanel } from '../components/EditorPanel';

export default function DataValidator() {
  const [jsonData, setJsonData] = useState<string>('{\n  "name": "John Doe",\n  "age": 30,\n  "email": "john@example.com"\n}');
  const [jsonSchema, setJsonSchema] = useState<string>('{\n  "type": "object",\n  "properties": {\n    "name": { "type": "string" },\n    "age": { "type": "number" },\n    "email": { "type": "string" }\n  },\n  "required": ["name", "email"]\n}');
  const [errors, setErrors] = useState<string[]>([]);

  const validate = (data: unknown, schema: any): string[] => {
    const errorList: string[] = [];

    const checkType = (value: unknown, targetType: string): boolean => {
      if (targetType === 'string') return typeof value === 'string';
      if (targetType === 'number') return typeof value === 'number';
      if (targetType === 'boolean') return typeof value === 'boolean';
      if (targetType === 'object') return typeof value === 'object' && value !== null && !Array.isArray(value);
      if (targetType === 'array') return Array.isArray(value);
      if (targetType === 'null') return value === null;
      return false;
    };

    const runValidation = (currentData: unknown, currentSchema: any, path: string) => {
      if (!currentSchema) return;

      const pathName = path || 'Root';

      if (currentSchema.type && !checkType(currentData, currentSchema.type)) {
        errorList.push(`${pathName}: Expected type ${currentSchema.type}, but found ${currentData === null ? 'null' : Array.isArray(currentData) ? 'array' : typeof currentData}`);
        return; // Don't check further for this value if type is wrong
      }

      if (currentSchema.type === 'object' && typeof currentData === 'object' && currentData !== null && !Array.isArray(currentData)) {
        // Check required fields
        if (Array.isArray(currentSchema.required)) {
          currentSchema.required.forEach((key: string) => {
            if (!(key in (currentData as any))) {
              errorList.push(`${pathName}: Missing required field "${key}"`);
            }
          });
        }

        // Recursively check properties
        if (currentSchema.properties) {
          Object.keys(currentSchema.properties).forEach((key) => {
            if (key in (currentData as any)) {
              runValidation((currentData as any)[key], currentSchema.properties[key], `${path}.${key}`);
            }
          });
        }
      }
    };

    runValidation(data, schema, '');
    return errorList;
  };

  useEffect(() => {
    try {
      const data = JSON.parse(jsonData);
      const schema = JSON.parse(jsonSchema);
      setErrors(validate(data, schema));
    } catch (e) {
      setErrors(['Invalid JSON in data or schema']);
    }
  }, [jsonData, jsonSchema]);

  return (
    <div className="flex flex-col gap-6">
      {errors.length > 0 && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-md flex flex-col gap-2">
          <span className="text-red-700 font-bold text-sm">Validation Errors:</span>
          <ul className="text-red-600 text-sm list-disc pl-5">
            {errors.map((err, i) => (
              <li key={i}>{err}</li>
            ))}
          </ul>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <EditorPanel
          value={jsonData}
          onChange={(val) => setJsonData(val || '')}
          language="json"
          label="JSON Data"
        />
        <EditorPanel
          value={jsonSchema}
          onChange={(val) => setJsonSchema(val || '')}
          language="json"
          label="JSON Schema"
        />
      </div>
    </div>
  );
}
