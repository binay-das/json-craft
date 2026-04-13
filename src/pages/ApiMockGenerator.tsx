import { useState, useEffect } from 'react';
import { EditorPanel } from '../components/EditorPanel';

const DEFAULT_INPUT = JSON.stringify(
  {
    endpoint: '/api/users',
    method: 'GET',
    response: {
      status: 200,
      body: {
        users: [
          { id: 1, name: 'Alice', email: 'alice@example.com' },
          { id: 2, name: 'Bob', email: 'bob@example.com' },
        ],
        total: 2,
      },
    },
  },
  null,
  2
);

function generateMock(input: unknown): unknown {
  if (typeof input !== 'object' || input === null) {
    throw new Error('Input must be a JSON object.');
  }

  const obj = input as Record<string, unknown>;

  const endpoint = (obj.endpoint as string) || '/api/mock';
  const method = ((obj.method as string) || 'GET').toUpperCase();
  const responseConfig = (obj.response as Record<string, unknown>) || {};
  const status = (responseConfig.status as number) ?? 200;
  const body = responseConfig.body ?? {};

  return {
    mock: {
      endpoint,
      method,
      response: {
        status,
        headers: {
          'Content-Type': 'application/json',
          'X-Mock-Generated': 'true',
        },
        body,
      },
    },
    curl: `curl -X ${method} http://localhost:5173${endpoint}`,
    fetch: `fetch('${endpoint}', { method: '${method}' })\n  .then(res => res.json())\n  .then(data => console.log(data));`,
  };
}

export default function ApiMockGenerator() {
  const [value, setValue] = useState<string>(DEFAULT_INPUT);
  const [output, setOutput] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setError(null);
    if (!value.trim()) {
      setOutput('');
      return;
    }

    try {
      const parsed = JSON.parse(value);
      const mock = generateMock(parsed);
      setOutput(JSON.stringify(mock, null, 2));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid input');
    }
  }, [value]);

  return (
    <div className="flex flex-col gap-4">
      {error && (
        <div className="p-3 bg-red-100 text-red-700 border border-red-300 rounded-md text-sm">
          {error}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <EditorPanel
          value={value}
          onChange={(val) => setValue(val || '')}
          language="json"
          label="API Definition (Input)"
        />
        <EditorPanel
          value={output}
          language="json"
          label="Generated Mock (Output)"
          readOnly
        />
      </div>
    </div>
  );
}
