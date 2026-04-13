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
    <div style={{
      display: 'flex', flexDirection: 'column', width: '100%', height: 420,
      border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden',
      background: 'var(--bg-surface)',
    }}>
      {(label || toolbar) && (
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '8px 14px',
          borderBottom: '1px solid var(--border)',
          background: 'var(--bg-elevated)',
        }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            {label}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>{toolbar}</div>
        </div>
      )}
      <div style={{ flex: 1, minHeight: 0 }}>
        <Editor
          height="100%"
          width="100%"
          theme="vs-dark"
          language={language}
          value={value}
          onChange={onChange}
          options={{
            readOnly,
            fontSize: 13,
            minimap: { enabled: false },
            wordWrap: 'on',
            scrollBeyondLastLine: false,
            smoothScrolling: true,
            padding: { top: 14, bottom: 14 },
            fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', Consolas, monospace",
            lineNumbersMinChars: 3,
            renderLineHighlight: 'gutter',
          }}
        />
      </div>
    </div>
  );
}
