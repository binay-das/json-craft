import { useState } from 'react';
import { EditorPanel } from '../components/EditorPanel';

export default function JsonFormatter() {
  const [value, setValue] = useState<string>("{\n  \"example\": \"data\"\n}");
  const [outputValue, setOutputValue] = useState<string>("{\n  \"example\": \"data\"\n}");
  const [error, setError] = useState<string | null>(null);

  const handlePrettyPrint = () => {
    setError(null);
    try {
      if (!value.trim()) {
        setOutputValue("");
        return;
      }
      const parsed = JSON.parse(value);
      const formatted = JSON.stringify(parsed, null, 2);
      setOutputValue(formatted);
    } catch (err) {
      if (err instanceof Error) {
        setError(`Invalid JSON: ${err.message}`);
      } else {
        setError("Invalid JSON");
      }
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {error && (
        <div className="p-3 bg-red-100 text-red-700 border border-red-300 rounded-md">
          {error}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <EditorPanel
          value={value}
          onChange={(val) => setValue(val || "")}
          language="json"
          label="Input"
          toolbar={
            <button
              onClick={handlePrettyPrint}
              className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded transition"
            >
              Pretty Print
            </button>
          }
        />
        <EditorPanel
          value={outputValue}
          language="json"
          label="Output"
          readOnly
        />
      </div>
    </div>
  );
}
