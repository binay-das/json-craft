import { useState } from 'react';
import { EditorPanel } from '../components/EditorPanel';
import { parseJSON, prettyPrintJSON, minifyJSON } from '../lib/utils';

/* Dark-mode button style helper */
const btn = (variant: 'primary' | 'secondary' | 'danger' = 'secondary'): React.CSSProperties => ({
  padding: '5px 14px',
  borderRadius: 7,
  border: '1px solid var(--border)',
  fontSize: '0.78rem',
  fontWeight: 600,
  cursor: 'pointer',
  fontFamily: 'var(--font-mono)',
  transition: 'opacity 0.15s, transform 0.15s',
  background:
    variant === 'primary' ? '#3b82f6'
    : variant === 'danger' ? 'rgba(239,68,68,0.15)'
    : 'var(--bg-elevated)',
  color:
    variant === 'primary' ? '#fff'
    : variant === 'danger' ? '#ef4444'
    : 'var(--text-secondary)',
});

export default function JsonFormatter() {
  const [value, setValue] = useState<string>("{\n  \"example\": \"data\"\n}");
  const [outputValue, setOutputValue] = useState<string>("{\n  \"example\": \"data\"\n}");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handlePrettyPrint = () => {
    setError(null); setSuccess(null);
    if (!value.trim()) { setOutputValue(''); return; }
    try { setOutputValue(prettyPrintJSON(value)); }
    catch (err) { setError(err instanceof Error ? `Invalid JSON: ${err.message}` : 'Invalid JSON'); }
  };

  const handleMinify = () => {
    setError(null); setSuccess(null);
    if (!value.trim()) { setOutputValue(''); return; }
    try { setOutputValue(minifyJSON(value)); }
    catch (err) { setError(err instanceof Error ? `Invalid JSON: ${err.message}` : 'Invalid JSON'); }
  };

  const handleValidate = () => {
    setError(null); setSuccess(null);
    if (!value.trim()) { setError('Please enter JSON to validate'); return; }
    try { parseJSON(value); setSuccess('Valid JSON ✓'); }
    catch (err) { setError(err instanceof Error ? `Invalid JSON: ${err.message}` : 'Invalid JSON'); }
  };

  const handleEditorChange = (val: string | undefined) => {
    const newValue = val || '';
    setValue(newValue);
    setSuccess(null);
    if (error && newValue.trim()) {
      try { parseJSON(newValue); setError(null); } catch { /* still invalid */ }
    }
    if (!newValue.trim()) setError(null);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Status banner */}
      {error && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '10px 14px', borderRadius: 8,
          background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
          color: '#ef4444', fontSize: '0.85rem',
        }}>
          <span style={{ fontWeight: 700 }}>✕</span> {error}
        </div>
      )}
      {success && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '10px 14px', borderRadius: 8,
          background: 'rgba(34,211,165,0.1)', border: '1px solid rgba(34,211,165,0.3)',
          color: '#22d3a5', fontSize: '0.85rem',
        }}>
          <span style={{ fontWeight: 700 }}>✓</span> {success}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <EditorPanel
          value={value}
          onChange={handleEditorChange}
          language="json"
          label="Input"
          toolbar={
            <>
              <button style={btn('secondary')} onClick={handleValidate}>Validate</button>
              <button style={btn('secondary')} onClick={handleMinify}>Minify</button>
              <button style={btn('primary')} onClick={handlePrettyPrint}>Pretty Print</button>
            </>
          }
        />
        <EditorPanel value={outputValue} language="json" label="Output" readOnly />
      </div>
    </div>
  );
}