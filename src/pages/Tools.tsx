import { useState } from "react";
import { EditorPanel } from "../components/EditorPanel";

export default function Tools() {
  const [editorPanelValue, setEditorPanelValue] = useState<string>("{\n  \"hello\": \"world\"\n}");
  const [readOnly, setReadOnly] = useState<boolean>(false);
  const [language, setLanguage] = useState<string>("json");

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Tools </h1>

      <div className="flex gap-4 items-center">
        <label className="flex items-center gap-2">
          <input 
            type="checkbox" 
            checked={readOnly} 
            onChange={(e) => setReadOnly(e.target.checked)} 
          />
          Read Only
        </label>

        <label className="flex items-center gap-2">
          Language:
          <select 
            value={language} 
            onChange={(e) => setLanguage(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1"
          >
            <option value="json">JSON</option>
            <option value="javascript">JavaScript</option>
            <option value="typescript">TypeScript</option>
            <option value="html">HTML</option>
          </select>
        </label>
      </div>

      <EditorPanel
        value={editorPanelValue}
        onChange={(value) => setEditorPanelValue(value || "")}
        language={language}
        readOnly={readOnly} 
      />

    </div>
  );
}
