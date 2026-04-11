import { useState } from 'react';
import { EditorPanel } from '../components/EditorPanel';

export default function JsonFormatter() {
  const [value, setValue] = useState<string>("{\n  \"example\": \"data\"\n}");
  const [outputValue, setOutputValue] = useState<string>("{\n  \"example\": \"data\"\n}");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handlePrettyPrint = () => {
    setError(null);
    setSuccess(null);
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

  const handleMinify = () => {
    setError(null);
    setSuccess(null);
    
    try {
      if (!value.trim()) {
        setOutputValue("");
        return;
      }
      const parsed = JSON.parse(value);
      const minified = JSON.stringify(parsed);

      setOutputValue(minified);

    } catch (err) {

      if (err instanceof Error) {
        setError(`Invalid JSON: ${err.message}`);
      } else {
        setError("Invalid JSON");
      }

    }
  };

  const handleValidate = () => {
    setError(null);
    setSuccess(null);
    if (!value.trim()) {
      setError("Please enter JSON to validate");
      return;
    }
    try {
      JSON.parse(value);
      setSuccess("Valid JSON");
    } catch (err) {
      if (err instanceof Error) {
        setError(`Invalid JSON: ${err.message}`);
      } else {
        setError("Invalid JSON");
      }
    }
  };

  // clear messages when input changes
  const handleEditorChange = (val: string | undefined) => {
    setValue(val || "");
    if (error || success) {
      setError(null);
      setSuccess(null);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {error && (
        <div className="p-3 bg-red-100 text-red-700 border border-red-300 rounded-md">
          {error}
        </div>
      )}
      {success && (
        <div className="p-3 bg-green-100 text-green-700 border border-green-300 rounded-md">
          {success}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <EditorPanel
          value={value}
          onChange={handleEditorChange}
          language="json"
          label="Input"
          toolbar={
            <div className="flex items-center gap-2">
              <button
                onClick={handleValidate}
                className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-xs font-semibold rounded transition"
              >
                Validate
              </button>
              <button
                onClick={handleMinify}
                className="px-3 py-1 bg-gray-600 hover:bg-gray-700 text-white text-xs font-semibold rounded transition"
              >
                Minify
              </button>
              <button
                onClick={handlePrettyPrint}
                className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded transition"
              >
                Pretty Print
              </button>
            </div>
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
