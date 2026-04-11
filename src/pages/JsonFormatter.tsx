import { useState } from 'react';
import { EditorPanel } from '../components/EditorPanel';
import { parseJSON, prettyPrintJSON, minifyJSON } from '../lib/utils';

export default function JsonFormatter() {
  const [value, setValue] = useState<string>("{\n  \"example\": \"data\"\n}");
  const [outputValue, setOutputValue] = useState<string>("{\n  \"example\": \"data\"\n}");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handlePrettyPrint = () => {
    setError(null);
    setSuccess(null);

    if (!value.trim()) {
      setOutputValue("");
      return;
    }

    try {
      setOutputValue(prettyPrintJSON(value));
    } catch (err) {
      setError(err instanceof Error ? `Invalid JSON: ${err.message}` : "Invalid JSON");
    }
  };

  const handleMinify = () => {
    setError(null);
    setSuccess(null);

    if (!value.trim()) {
      setOutputValue("");
      return;
    }

    try {
      setOutputValue(minifyJSON(value));
    } catch (err) {
      setError(err instanceof Error ? `Invalid JSON: ${err.message}` : "Invalid JSON");
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
      parseJSON(value);
      setSuccess("Valid JSON");
    } catch (err) {
      setError(err instanceof Error ? `Invalid JSON: ${err.message}` : "Invalid JSON");
    }
  };

  const handleEditorChange = (val: string | undefined) => {
    const newValue = val || "";
    setValue(newValue);
    setSuccess(null);

    if (error) {
      if (!newValue.trim()) {
        setError(null);
        return;
      }

      try {
        parseJSON(newValue);
        setError(null);
      } catch {
        // still invalid → keep error
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