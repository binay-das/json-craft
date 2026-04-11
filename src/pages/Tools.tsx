import { useState } from "react";
import { EditorPanel } from "../components/EditorPanel";

export default function Tools() {
  const [editorPanelValue, setEditorPanelValue] = useState<string>("{\n  \"hello\": \"world\"\n}");
  return (
    <div>
      <h1>Tools </h1>

      <EditorPanel
        value={editorPanelValue}
        onChange={(editorPanelValue) => setEditorPanelValue(editorPanelValue || "")}
        language="json" />

    </div>
  );
}
