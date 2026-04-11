import { useState, useEffect } from 'react';
import { EditorPanel } from '../components/EditorPanel';

export default function CsvToJson() {
  const [value, setValue] = useState<string>("name,age\nAlice,30\nBob,25");
  const [outputValue, setOutputValue] = useState<string>("[\n  {\n    \"name\": \"Alice\",\n    \"age\": \"30\"\n  },\n  {\n    \"name\": \"Bob\",\n    \"age\": \"25\"\n  }\n]");
  const [headers, setHeaders] = useState<string[]>(['name', 'age']);
  const [delimiter, setDelimiter] = useState<string>(",");

  useEffect(() => {
    const lines = value.split('\n');
    if (lines.length > 0 && lines[0].trim() !== '') {
      const headerRow = lines[0].split(delimiter).map(h => h.trim());
      setHeaders(headerRow);
    } else {
      setHeaders([]);
    }
  }, [value, delimiter]);

  const handleEditorChange = (val: string | undefined) => {
    setValue(val || "");
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
          Delimiter:
          <select 
            value={delimiter} 
            onChange={(e) => setDelimiter(e.target.value)}
            className="border border-gray-300 rounded-md px-2 py-1 text-sm bg-white focus:outline-none focus:border-blue-500"
          >
            <option value=",">Comma (,)</option>
            <option value=";">Semicolon (;)</option>
            <option value="\t">Tab (\t)</option>
          </select>
        </label>
      </div>

      {headers.length > 0 && (
        <div className="p-3 bg-blue-50 text-blue-700 border border-blue-200 rounded-md text-sm">
          <strong>Detected Headers:</strong> {headers.join(', ')}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <EditorPanel
          value={value}
          onChange={handleEditorChange}
          language="text"
          label="CSV Input"
        />
        <EditorPanel
          value={outputValue}
          language="json"
          label="JSON Output"
          readOnly
        />
      </div>
    </div>
  );
}
