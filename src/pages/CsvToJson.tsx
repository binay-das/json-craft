import { useState, useEffect } from 'react';
import { EditorPanel } from '../components/EditorPanel';

export default function CsvToJson() {
  const [value, setValue] = useState<string>("name,age\nAlice,30\nBob,25");
  const [outputValue, setOutputValue] = useState<string>('[\n  {\n    "name": "Alice",\n    "age": 30\n  },\n  {\n    "name": "Bob",\n    "age": 25\n  }\n]');
  const [headers, setHeaders] = useState<string[]>(['name', 'age']);
  const [delimiter, setDelimiter] = useState<string>(",");

  useEffect(() => {
    const lines = value.split('\n');
    let generatedHeaders: string[] = [];

    if (lines.length > 0 && lines[0].trim() !== '') {
      generatedHeaders = lines[0].split(delimiter).map(h => h.trim());
      setHeaders(generatedHeaders);
    } else {
      setHeaders([]);
      setOutputValue('[]');
      return;
    }

    const jsonArray = [];
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;
      const values = line.split(delimiter).map(v => v.trim());
      const obj: Record<string, string | number> = {};
      generatedHeaders.forEach((header, index) => {
        let val: string | number = values[index] !== undefined ? values[index] : '';
        if (val !== '' && !isNaN(Number(val))) val = Number(val);
        obj[header] = val;
      });
      jsonArray.push(obj);
    }

    setOutputValue(JSON.stringify(jsonArray, null, 2));
  }, [value, delimiter]);

  const handleDownload = () => {
    const blob = new Blob([outputValue], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'converted.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Controls row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.82rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
          Delimiter:
          <select
            value={delimiter}
            onChange={e => setDelimiter(e.target.value)}
            style={{
              background: 'var(--bg-elevated)', border: '1px solid var(--border)',
              borderRadius: 6, padding: '4px 10px',
              fontSize: '0.8rem', color: 'var(--text-primary)', outline: 'none',
              fontFamily: 'var(--font-mono)',
            }}
          >
            <option value=",">Comma (,)</option>
            <option value=";">Semicolon (;)</option>
            <option value="\t">Tab (\t)</option>
          </select>
        </label>

        {headers.length > 0 && (
          <div style={{
            padding: '4px 12px', borderRadius: 6,
            background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.25)',
            fontSize: '0.78rem', color: '#60a5fa', fontFamily: 'var(--font-mono)',
          }}>
            <strong>Detected:</strong> {headers.join(', ')}
          </div>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <EditorPanel
          value={value}
          onChange={val => setValue(val || '')}
          language="plaintext"
          label="CSV Input"
        />
        <EditorPanel
          value={outputValue}
          language="json"
          label="JSON Output"
          readOnly
          toolbar={
            <button
              onClick={handleDownload}
              style={{
                padding: '4px 12px', borderRadius: 6, border: '1px solid rgba(34,211,165,0.3)',
                background: 'rgba(34,211,165,0.1)', color: '#22d3a5',
                fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer',
                fontFamily: 'var(--font-mono)',
              }}
            >
              ↓ Download
            </button>
          }
        />
      </div>
    </div>
  );
}
