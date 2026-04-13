import { useState, useEffect, useRef } from 'react';
import { EditorPanel } from '../components/EditorPanel';

function Toast({ message, type, onDone }: { message: string; type: 'success' | 'error'; onDone: () => void }) {
  useEffect(() => { const t = setTimeout(onDone, 3000); return () => clearTimeout(t); }, [onDone]);
  return (
    <div style={{
      position: 'fixed', bottom: 24, right: 24, zIndex: 50,
      display: 'flex', alignItems: 'center', gap: 8,
      padding: '10px 16px', borderRadius: 10, fontSize: '0.85rem', fontWeight: 600,
      animation: 'fadeInUp 0.25s ease-out',
      background: type === 'success' ? 'rgba(34,211,165,0.15)' : 'rgba(239,68,68,0.15)',
      border: `1px solid ${type === 'success' ? 'rgba(34,211,165,0.4)' : 'rgba(239,68,68,0.4)'}`,
      color: type === 'success' ? '#22d3a5' : '#ef4444',
    }}>
      {type === 'success' ? '✓' : '✕'} {message}
    </div>
  );
}

export default function DataValidator() {
  const [jsonData,   setJsonData]   = useState<string>('{\n  "name": "John Doe",\n  "age": 30,\n  "email": "john@example.com"\n}');
  const [jsonSchema, setJsonSchema] = useState<string>('{\n  "type": "object",\n  "properties": {\n    "name": { "type": "string" },\n    "age":  { "type": "number" },\n    "email": { "type": "string" }\n  },\n  "required": ["name", "email"]\n}');
  const [errors, setErrors] = useState<string[]>([]);
  const [toast,  setToast]  = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const prevValid = useRef<boolean | null>(null);

  const validate = (data: unknown, schema: any): string[] => {
    const errorList: string[] = [];
    const checkType = (v: unknown, t: string) => {
      if (t === 'string')  return typeof v === 'string';
      if (t === 'number')  return typeof v === 'number';
      if (t === 'boolean') return typeof v === 'boolean';
      if (t === 'object')  return typeof v === 'object' && v !== null && !Array.isArray(v);
      if (t === 'array')   return Array.isArray(v);
      if (t === 'null')    return v === null;
      return false;
    };
    const run = (d: unknown, s: any, path: string) => {
      if (!s) return;
      const p = path || 'Root';
      if (s.type && !checkType(d, s.type)) {
        errorList.push(`${p}: Expected type "${s.type}", found "${d === null ? 'null' : Array.isArray(d) ? 'array' : typeof d}"`);
        return;
      }
      if (s.type === 'object' && typeof d === 'object' && d !== null && !Array.isArray(d)) {
        if (Array.isArray(s.required)) s.required.forEach((k: string) => { if (!(k in (d as any))) errorList.push(`${p}: Missing required field "${k}"`); });
        if (s.properties) Object.keys(s.properties).forEach(k => { if (k in (d as any)) run((d as any)[k], s.properties[k], `${path}.${k}`); });
      } else if (s.type === 'array' && Array.isArray(d)) {
        if (s.items) d.forEach((item, i) => run(item, s.items, `${path}[${i}]`));
      }
    };
    run(data, schema, '');
    return errorList;
  };

  useEffect(() => {
    let currentErrors: string[] = [];
    let isValid = false;
    try {
      currentErrors = validate(JSON.parse(jsonData), JSON.parse(jsonSchema));
      isValid = currentErrors.length === 0;
    } catch {
      currentErrors = ['Invalid JSON in data or schema'];
    }
    setErrors(currentErrors);
    if (prevValid.current !== null && prevValid.current !== isValid) {
      setToast(isValid
        ? { message: 'JSON Data is valid!', type: 'success' }
        : { message: 'Validation failed!', type: 'error' }
      );
    }
    prevValid.current = isValid;
  }, [jsonData, jsonSchema]);

  const isValid = errors.length === 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Status bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
          Validation Status
        </span>
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          padding: '4px 12px', borderRadius: 999,
          fontSize: '0.72rem', fontWeight: 700, fontFamily: 'var(--font-mono)',
          background: isValid ? 'rgba(34,211,165,0.12)' : 'rgba(239,68,68,0.12)',
          border: `1px solid ${isValid ? 'rgba(34,211,165,0.35)' : 'rgba(239,68,68,0.35)'}`,
          color: isValid ? '#22d3a5' : '#ef4444',
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: isValid ? '#22d3a5' : '#ef4444', animation: isValid ? 'none' : undefined }} />
          {isValid ? 'VALID' : 'INVALID'}
        </span>
      </div>

      {/* Editors */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <EditorPanel value={jsonData}   onChange={v => setJsonData(v || '')}   language="json" label="JSON Data" />
        <EditorPanel value={jsonSchema} onChange={v => setJsonSchema(v || '')} language="json" label="JSON Schema" />
      </div>

      {/* Results */}
      <div>
        <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: 10 }}>
          Validation Results
        </div>
        {errors.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {errors.map((err, i) => (
              <div key={i} style={{
                padding: '10px 14px', borderRadius: 8,
                background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)',
                fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: '#ef4444',
              }}>
                {err}
              </div>
            ))}
          </div>
        ) : (
          <div style={{
            padding: '14px 18px', borderRadius: 8,
            background: 'rgba(34,211,165,0.08)', border: '1px solid rgba(34,211,165,0.25)',
            fontSize: '0.85rem', color: '#22d3a5', fontFamily: 'var(--font-mono)',
          }}>
            ✓ Data matches the schema.
          </div>
        )}
      </div>

      {toast && <Toast message={toast.message} type={toast.type} onDone={() => setToast(null)} />}
    </div>
  );
}
