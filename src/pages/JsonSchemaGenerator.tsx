import { useState, useEffect } from 'react';
import { EditorPanel } from '../components/EditorPanel';

function generateSchema(value: unknown): any {
  if (value === null) return { type: 'null' };
  if (Array.isArray(value)) return { type: 'array', items: value.length > 0 ? generateSchema(value[0]) : {} };
  if (typeof value === 'object') {
    const properties: Record<string, any> = {};
    const required: string[] = [];
    for (const [key, val] of Object.entries(value as Record<string, any>)) {
      properties[key] = generateSchema(val);
      required.push(key);
    }
    const schema: any = { type: 'object', properties };
    if (required.length > 0) schema.required = required;
    return schema;
  }
  switch (typeof value) {
    case 'string':  return { type: 'string' };
    case 'number':  return { type: 'number' };
    case 'boolean': return { type: 'boolean' };
    default:        return {};
  }
}

export default function JsonSchemaGenerator() {
  const [value, setValue] = useState<string>("{\n  \"name\": \"Alice\"\n}");
  const [outputValue, setOutputValue] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setError(null);
    if (!value.trim()) { setOutputValue(''); return; }
    try {
      const parsed = JSON.parse(value);
      const schema = generateSchema(parsed);
      setOutputValue(JSON.stringify({ $schema: 'http://json-schema.org/draft-07/schema#', ...schema }, null, 2));
    } catch (err) {
      setError(err instanceof Error ? `Invalid JSON: ${err.message}` : 'Invalid JSON');
    }
  }, [value]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
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
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <EditorPanel
          value={value}
          onChange={val => setValue(val || '')}
          language="json"
          label="JSON Input"
        />
        <EditorPanel
          value={outputValue}
          language="json"
          label="Generated Schema"
          readOnly
        />
      </div>
    </div>
  );
}
