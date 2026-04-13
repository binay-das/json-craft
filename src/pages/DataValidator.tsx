import { useState } from 'react';
import { EditorPanel } from '../components/EditorPanel';

export default function DataValidator() {
  const [jsonData, setJsonData] = useState<string>('{\n  "name": "John Doe",\n  "age": 30,\n  "email": "john@example.com"\n}');
  const [jsonSchema, setJsonSchema] = useState<string>('{\n  "type": "object",\n  "properties": {\n    "name": { "type": "string" },\n    "age": { "type": "number" },\n    "email": { "type": "string" }\n  },\n  "required": ["name", "email"]\n}');

  return (
    <div className="flex flex-col gap-6">
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
