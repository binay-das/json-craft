import Editor from '@monaco-editor/react';

interface EditorPanelProps {
  value: string;
  onChange?: (value: string | undefined) => void;
  language?: string;
  readOnly?: boolean;
}

export function EditorPanel({
  value,
  onChange,
  language = 'json',
  readOnly = false
}: EditorPanelProps) {
  return (
    <div className="w-full h-[400px] border border-gray-300">
      <Editor
        height="100%"
        width="100%"
        language={language}
        value={value}
        onChange={onChange}
        options={{ readOnly }}
      />
    </div>
  );
}
