import { useState, useEffect, useCallback } from 'react';
import { EditorPanel } from '../components/EditorPanel';


const DEFAULT_INPUT = JSON.stringify(
  [
    { id: 1, name: 'Alice', email: 'alice@example.com', role: 'admin' },
    { id: 2, name: 'Bob', email: 'bob@example.com', role: 'user' },
  ],
  null,
  2
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

  if (data.length === 0) {
    throw new Error('Input array must not be empty.');
  }

  const firstKey = Object.keys(data[0])[0];
  const resource = (firstKey && firstKey !== 'id') ? firstKey + 's' : 'items';

  return { data, resource };
}


function generateEndpointDefs(resource: string): string {
  const lines = [
    `REST Endpoints for /${resource}`,
    '─'.repeat(42),
    `GET    /${resource}          → Retrieve all ${resource}`,
    `GET    /${resource}/:id      → Retrieve a single ${resource} by ID`,
    `POST   /${resource}          → Create a new ${resource}`,
    `PUT    /${resource}/:id      → Update an existing ${resource} by ID`,
    `DELETE /${resource}/:id      → Delete a ${resource} by ID`,
  ];
  return lines.join('\n');
}


function generateExpressHandlers(
  resource: string,
  data: Record<string, unknown>[]
): string {
  const dataJson = JSON.stringify(data, null, 2)
    .split('\n')
    .map((l, i) => (i === 0 ? l : `  ${l}`))
    .join('\n');

  return `// Auto-generated mock Express.js handlers
// Resource: /${resource}

const data = ${dataJson};

// GET /${resource} — list all
app.get('/${resource}', (req, res) => {
  res.json(data);
});

// GET /${resource}/:id — get one
app.get('/${resource}/:id', (req, res) => {
  const id = Number(req.params.id);
  const item = data.find((d) => d.id === id);
  if (!item) return res.status(404).json({ error: '${resource.slice(0, -1)} not found' });
  res.json(item);
});

// POST /${resource} — create
app.post('/${resource}', (req, res) => {
  const newItem = { id: data.length + 1, ...req.body };
  data.push(newItem);
  res.status(201).json(newItem);
});

// PUT /${resource}/:id — update
app.put('/${resource}/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = data.findIndex((d) => d.id === id);
  if (index === -1) return res.status(404).json({ error: '${resource.slice(0, -1)} not found' });
  data[index] = { ...data[index], ...req.body };
  res.json(data[index]);
});

// DELETE /${resource}/:id — delete
app.delete('/${resource}/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = data.findIndex((d) => d.id === id);
  if (index === -1) return res.status(404).json({ error: '${resource.slice(0, -1)} not found' });
  const [deleted] = data.splice(index, 1);
  res.json(deleted);
});`;
}


function generatePayloads(
  resource: string,
  data: Record<string, unknown>[]
): string {
  const single = data[0];
  const notFoundPayload = { error: `${resource.slice(0, -1)} not found` };

  const payloads = {
    [`GET /${resource}`]: data,
    [`GET /${resource}/:id`]: single,
    [`POST /${resource}`]: { id: data.length + 1, ...single },
    [`PUT /${resource}/:id`]: single,
    [`DELETE /${resource}/:id`]: single,
    'Error (404)': notFoundPayload,
  };

  return Object.entries(payloads)
    .map(([label, payload]) => `// ${label}\n${JSON.stringify(payload, null, 2)}`)
    .join('\n\n');
}


function Toast({ message, onDone }: { message: string; onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2500);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-lg
        bg-green-600 text-white px-4 py-2.5 text-sm font-medium shadow-lg
        animate-[fadeInUp_0.25s_ease-out]"
    >
      <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
      {message}
    </div>
  );
}


type Tab = 'endpoints' | 'handlers' | 'payloads';

const TAB_LABELS: { id: Tab; label: string }[] = [
  { id: 'endpoints', label: 'REST Endpoints' },
  { id: 'handlers', label: 'Express Handlers' },
  { id: 'payloads', label: 'Sample Payloads' },
];


export default function ApiMockGenerator() {
  const [inputValue, setInputValue] = useState<string>(DEFAULT_INPUT);
  const [activeTab, setActiveTab] = useState<Tab>('endpoints');
  const [outputs, setOutputs] = useState<Record<Tab, string>>({
    endpoints: '',
    handlers: '',
    payloads: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    setError(null);
    if (!inputValue.trim()) {
      setOutputs({ endpoints: '', handlers: '', payloads: '' });
      return;
    }

    try {
      const { data, resource } = normalizeInput(inputValue);
      setOutputs({
        endpoints: generateEndpointDefs(resource),
        handlers: generateExpressHandlers(resource, data),
        payloads: generatePayloads(resource, data),
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid JSON input');
      setOutputs({ endpoints: '', handlers: '', payloads: '' });
    }
  }, [inputValue]);

  const handleCopy = useCallback(() => {
    const text = outputs[activeTab];
    if (!text) return;
    navigator.clipboard.writeText(text).then(() => {
      setToast('Copied to clipboard!');
    });
  }, [outputs, activeTab]);

  const currentOutput = outputs[activeTab];
  const outputLanguage = activeTab === 'handlers' ? 'javascript' : 'plaintext';

  const copyButton = (
    <button
      id="api-mock-copy-btn"
      onClick={handleCopy}
      disabled={!currentOutput}
      title="Copy to clipboard"
      className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded
        bg-blue-50 text-blue-700 border border-blue-200
        hover:bg-blue-100 disabled:opacity-40 disabled:cursor-not-allowed
        transition-colors"
    >
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
        />
      </svg>
      Copy
    </button>
  );

  return (
    <div className="flex flex-col gap-4">
      {error && (
        <div className="p-3 bg-red-100 text-red-700 border border-red-300 rounded-md text-sm">
          {error}
        </div>
      )}

      <div className="flex gap-1 border-b border-gray-200">
        {TAB_LABELS.map(({ id, label }) => (
          <button
            key={id}
            id={`api-mock-tab-${id}`}
            onClick={() => setActiveTab(id)}
            className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px ${
              activeTab === id
                ? 'border-blue-600 text-blue-700'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <EditorPanel
          value={inputValue}
          onChange={(val) => setInputValue(val || '')}
          language="json"
          label="JSON Input (object or array)"
        />
        <EditorPanel
          value={currentOutput}
          language={outputLanguage}
          label={TAB_LABELS.find((t) => t.id === activeTab)?.label ?? 'Output'}
          readOnly
          toolbar={copyButton}
        />
      </div>

      {toast && <Toast message={toast} onDone={() => setToast(null)} />}
    </div>
  );
}
