import { useState, useEffect, useCallback } from 'react';
import { EditorPanel } from '../components/EditorPanel';

const DEFAULT_INPUT = JSON.stringify(
  [
    { id: 1, name: 'Alice', email: 'alice@example.com', role: 'admin' },
    { id: 2, name: 'Bob',   email: 'bob@example.com',   role: 'user'  },
  ],
  null, 2
);

function normalizeInput(raw: string): { data: Record<string, unknown>[]; resource: string } {
  const parsed: unknown = JSON.parse(raw);
  let data: Record<string, unknown>[];
  if (Array.isArray(parsed)) {
    data = parsed as Record<string, unknown>[];
  } else if (typeof parsed === 'object' && parsed !== null) {
    data = [parsed as Record<string, unknown>];
  } else {
    throw new Error('Input must be a JSON object or array of objects.');
  }
  if (data.length === 0) throw new Error('Input array must not be empty.');
  const firstKey = Object.keys(data[0])[0];
  const resource = (firstKey && firstKey !== 'id') ? firstKey + 's' : 'items';
  return { data, resource };
}

function generateEndpointDefs(resource: string): string {
  return [
    `REST Endpoints for /${resource}`,
    '─'.repeat(42),
    `GET    /${resource}          → Retrieve all ${resource}`,
    `GET    /${resource}/:id      → Retrieve a single ${resource} by ID`,
    `POST   /${resource}          → Create a new ${resource}`,
    `PUT    /${resource}/:id      → Update an existing ${resource} by ID`,
    `DELETE /${resource}/:id      → Delete a ${resource} by ID`,
  ].join('\n');
}

function generateExpressHandlers(resource: string, data: Record<string, unknown>[]): string {
  const dataJson = JSON.stringify(data, null, 2).split('\n').map((l, i) => (i === 0 ? l : `  ${l}`)).join('\n');
  return `// Auto-generated mock Express.js handlers\n// Resource: /${resource}\n\nconst data = ${dataJson};\n\napp.get('/${resource}', (req, res) => { res.json(data); });\napp.get('/${resource}/:id', (req, res) => {\n  const item = data.find((d) => d.id === Number(req.params.id));\n  if (!item) return res.status(404).json({ error: '${resource.slice(0, -1)} not found' });\n  res.json(item);\n});\napp.post('/${resource}', (req, res) => {\n  const newItem = { id: data.length + 1, ...req.body };\n  data.push(newItem);\n  res.status(201).json(newItem);\n});\napp.put('/${resource}/:id', (req, res) => {\n  const index = data.findIndex((d) => d.id === Number(req.params.id));\n  if (index === -1) return res.status(404).json({ error: '${resource.slice(0, -1)} not found' });\n  data[index] = { ...data[index], ...req.body };\n  res.json(data[index]);\n});\napp.delete('/${resource}/:id', (req, res) => {\n  const index = data.findIndex((d) => d.id === Number(req.params.id));\n  if (index === -1) return res.status(404).json({ error: '${resource.slice(0, -1)} not found' });\n  res.json(data.splice(index, 1)[0]);\n});`;
}

function generatePayloads(resource: string, data: Record<string, unknown>[]): string {
  const single = data[0];
  const payloads = {
    [`GET /${resource}`]: data,
    [`GET /${resource}/:id`]: single,
    [`POST /${resource}`]: { id: data.length + 1, ...single },
    [`PUT /${resource}/:id`]: single,
    [`DELETE /${resource}/:id`]: single,
    'Error (404)': { error: `${resource.slice(0, -1)} not found` },
  };
  return Object.entries(payloads).map(([l, p]) => `// ${l}\n${JSON.stringify(p, null, 2)}`).join('\n\n');
}

function Toast({ message, onDone }: { message: string; onDone: () => void }) {
  useEffect(() => { const t = setTimeout(onDone, 2500); return () => clearTimeout(t); }, [onDone]);
  return (
    <div style={{
      position: 'fixed', bottom: 24, right: 24, zIndex: 50,
      display: 'flex', alignItems: 'center', gap: 8,
      padding: '10px 16px', borderRadius: 10,
      background: 'rgba(34,211,165,0.15)', border: '1px solid rgba(34,211,165,0.4)',
      color: '#22d3a5', fontSize: '0.85rem', fontWeight: 600,
      animation: 'fadeInUp 0.25s ease-out',
    }}>
      ✓ {message}
    </div>
  );
}

type Tab = 'endpoints' | 'handlers' | 'payloads';
const TAB_LABELS: { id: Tab; label: string }[] = [
  { id: 'endpoints', label: 'REST Endpoints' },
  { id: 'handlers',  label: 'Express Handlers' },
  { id: 'payloads',  label: 'Sample Payloads' },
];

export default function ApiMockGenerator() {
  const [inputValue, setInputValue] = useState<string>(DEFAULT_INPUT);
  const [activeTab, setActiveTab] = useState<Tab>('endpoints');
  const [outputs, setOutputs] = useState<Record<Tab, string>>({ endpoints: '', handlers: '', payloads: '' });
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    setError(null);
    if (!inputValue.trim()) { setOutputs({ endpoints: '', handlers: '', payloads: '' }); return; }
    try {
      const { data, resource } = normalizeInput(inputValue);
      setOutputs({ endpoints: generateEndpointDefs(resource), handlers: generateExpressHandlers(resource, data), payloads: generatePayloads(resource, data) });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid JSON');
      setOutputs({ endpoints: '', handlers: '', payloads: '' });
    }
  }, [inputValue]);

  const handleCopy = useCallback(() => {
    const text = outputs[activeTab];
    if (!text) return;
    navigator.clipboard.writeText(text).then(() => setToast('Copied to clipboard!'));
  }, [outputs, activeTab]);

  const currentOutput = outputs[activeTab];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {error && (
        <div style={{
          padding: '10px 14px', borderRadius: 8,
          background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
          color: '#ef4444', fontSize: '0.85rem',
        }}>
          <strong>✕</strong> {error}
        </div>
      )}

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 2, borderBottom: '1px solid var(--border)' }}>
        {TAB_LABELS.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            style={{
              padding: '8px 16px', border: 'none', borderRadius: '6px 6px 0 0',
              fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer',
              fontFamily: 'var(--font-mono)',
              background: activeTab === id ? 'var(--bg-elevated)' : 'transparent',
              color: activeTab === id ? '#3b82f6' : 'var(--text-muted)',
              borderBottom: activeTab === id ? '2px solid #3b82f6' : '2px solid transparent',
              transition: 'color 0.15s',
            }}
          >
            {label}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <EditorPanel
          value={inputValue}
          onChange={val => setInputValue(val || '')}
          language="json"
          label="JSON Input (object or array)"
        />
        <EditorPanel
          value={currentOutput}
          language={activeTab === 'handlers' ? 'javascript' : 'plaintext'}
          label={TAB_LABELS.find(t => t.id === activeTab)?.label ?? 'Output'}
          readOnly
          toolbar={
            <button
              onClick={handleCopy}
              disabled={!currentOutput}
              style={{
                padding: '4px 12px', borderRadius: 6, cursor: 'pointer',
                border: '1px solid rgba(59,130,246,0.3)',
                background: 'rgba(59,130,246,0.1)', color: '#60a5fa',
                fontSize: '0.75rem', fontWeight: 600,
                fontFamily: 'var(--font-mono)',
                opacity: currentOutput ? 1 : 0.4,
              }}
            >
              Copy
            </button>
          }
        />
      </div>

      {toast && <Toast message={toast} onDone={() => setToast(null)} />}
    </div>
  );
}
