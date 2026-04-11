import { useState } from 'react';
import { EditorPanel } from '../components/EditorPanel';

export default function CsvToJson() {
  const [value, setValue] = useState<string>("name,age\nAlice,30\nBob,25");
  const [outputValue, setOutputValue] = useState<string>("[\n  {\n    \"name\": \"Alice\",\n    \"age\": \"30\"\n  },\n  {\n    \"name\": \"Bob\",\n    \"age\": \"25\"\n  }\n]");
  const [headers, setHeaders] = useState<string[]>(['name', 'age']);

  const handleEditorChange = (val: string | undefined) => {
    const newValue = val || "";
    setValue(newValue);

    const lines = newValue.split('\n');
    if (lines.length > 0 && lines[0].trim() !== '') {
      const headerRow = lines[0].split(',').map(h => h.trim());
      console.log(headerRow);
      setHeaders(headerRow);
    } else {
      setHeaders([]);
    }
  };

  return (
    <div className="flex flex-col gap-4">
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
