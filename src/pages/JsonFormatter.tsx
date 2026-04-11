import { useState } from 'react';
import { EditorPanel } from '../components/EditorPanel';

export default function JsonFormatter() {
  const [value, setValue] = useState<string>("{\n  \"example\": \"data\"\n}");

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <EditorPanel
        value={value}
        onChange={(val) => setValue(val || "")}
        language="json"
        label="Input"
      />
      <EditorPanel
        value={value}
        language="json"
        label="Output"
        readOnly
      />
    </div>
  );
}
