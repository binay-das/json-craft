import Editor from '@monaco-editor/react';

interface EditorPanelProps {
  value: string;
  onChange?: (value: string | undefined) => void;
  language?: string;
  readOnly?: boolean;
  label?: string;
  toolbar?: React.ReactNode;
}

export function EditorPanel({
  value,
  onChange,
  language = 'json',
  readOnly = false,
  label,
  toolbar,
}: EditorPanelProps) {
  return (
    <div className="flex flex-col w-full h-[400px] border border-gray-300 rounded-md overflow-hidden bg-white">
      {(label || toolbar) && (
        <div className="flex justify-between items-center px-4 py-2 border-b border-gray-200 bg-gray-50">
          <div className="font-medium text-sm text-gray-700">{label}</div>
          <div className="flex items-center gap-2">{toolbar}</div>
        </div>
      )}
      <div className="flex-1 min-h-0">
        <Editor
          height="100%"
          width="100%"
          language={language}
          value={value}
          onChange={onChange}
          options={{
            readOnly,
            fontSize: 14,
            minimap: { 
              enabled: true 
            },
            wordWrap: 'on',
            scrollBeyondLastLine: false,
            smoothScrolling: true,
            padding: { top: 16, bottom: 16 },
            fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', Consolas, monospace",
          }}
        />
      </div>
    </div>
  );
}
