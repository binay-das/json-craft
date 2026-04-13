import { useState, useEffect, useRef } from 'react';
import { EditorPanel } from '../components/EditorPanel';

function Toast({ message, type, onDone }: { message: string, type: 'success' | 'error', onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 3000);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-lg text-white px-4 py-2.5 text-sm font-medium shadow-lg animate-[fadeInUp_0.25s_ease-out] ${
        type === 'success' ? 'bg-green-600' : 'bg-red-600'
      }`}
    >
      {type === 'success' ? (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      ) : (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      )}
      {message}
    </div>
  );
}

export default function DataValidator() {
  const [jsonData, setJsonData] = useState<string>('{\n  "name": "John Doe",\n  "age": 30,\n  "email": "john@example.com"\n}');
  const [jsonSchema, setJsonSchema] = useState<string>('{\n  "type": "object",\n  "properties": {\n    "name": { "type": "string" },\n    "age": { "type": "number" },\n    "email": { "type": "string" }\n  },\n  "required": ["name", "email"]\n}');
  const [errors, setErrors] = useState<string[]>([]);
  const [toast, setToast] = useState<{ message: string, type: 'success' | 'error' } | null>(null);
  const prevValid = useRef<boolean | null>(null);

  const validate = (data: unknown, schema: any): string[] => {
    const errorList: string[] = [];

    const checkType = (value: unknown, targetType: string): boolean => {
      if (targetType === 'string') return typeof value === 'string';
      if (targetType === 'number') return typeof value === 'number';
      if (targetType === 'boolean') return typeof value === 'boolean';
      if (targetType === 'object') return typeof value === 'object' && value !== null && !Array.isArray(value);
      if (targetType === 'array') return Array.isArray(value);
      if (targetType === 'null') return value === null;
      return false;
    };

    const runValidation = (currentData: unknown, currentSchema: any, path: string) => {
      if (!currentSchema) return;

      const pathName = path || 'Root';

      if (currentSchema.type && !checkType(currentData, currentSchema.type)) {
        errorList.push(`${pathName}: Expected type ${currentSchema.type}, but found ${currentData === null ? 'null' : Array.isArray(currentData) ? 'array' : typeof currentData}`);
        return; // Don't check further for this value if type is wrong
      }

      if (currentSchema.type === 'object' && typeof currentData === 'object' && currentData !== null && !Array.isArray(currentData)) {
        // Check required fields
        if (Array.isArray(currentSchema.required)) {
          currentSchema.required.forEach((key: string) => {
            if (!(key in (currentData as any))) {
              errorList.push(`${pathName}: Missing required field "${key}"`);
            }
          });
        }

        // Recursively check properties
        if (currentSchema.properties) {
          Object.keys(currentSchema.properties).forEach((key) => {
            if (key in (currentData as any)) {
              runValidation((currentData as any)[key], currentSchema.properties[key], `${path}.${key}`);
            }
          });
        }
      } else if (currentSchema.type === 'array' && Array.isArray(currentData)) {
        if (currentSchema.items) {
          currentData.forEach((item, index) => {
            runValidation(item, currentSchema.items, `${path}[${index}]`);
          });
        }
      }
    };

    runValidation(data, schema, '');
    return errorList;
  };

  useEffect(() => {
    let currentErrors: string[] = [];
    let isValid = false;

    try {
      const data = JSON.parse(jsonData);
      const schema = JSON.parse(jsonSchema);
      currentErrors = validate(data, schema);
      isValid = currentErrors.length === 0;
    } catch (e) {
      currentErrors = ['Invalid JSON in data or schema'];
      isValid = false;
    }

    setErrors(currentErrors);

    // Toast logic
    if (prevValid.current !== null && prevValid.current !== isValid) {
      if (isValid) {
        setToast({ message: 'JSON Data is now valid!', type: 'success' });
      } else {
        setToast({ message: 'Validation failed!', type: 'error' });
      }
    }
    prevValid.current = isValid;
  }, [jsonData, jsonSchema]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Validation Status</h2>
        {errors.length === 0 ? (
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            VALID
          </span>
        ) : (
          <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold flex items-center gap-1">
            <div className="w-2 h-2 bg-red-500 rounded-full" />
            INVALID
          </span>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <EditorPanel
          value={jsonData}
          onChange={(val) => setJsonData(val || '')}
          language="json"
          label="JSON Data"
        />
        <EditorPanel
          value={jsonSchema}
          onChange={(val) => setJsonSchema(val || '')}
          language="json"
          label="JSON Schema"
        />
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-semibold text-gray-700">Validation Results</h3>
        {errors.length > 0 ? (
          <div className="flex flex-col gap-2">
            {errors.map((error, index) => (
              <div key={index} className="p-3 bg-red-50 border border-red-200 rounded-md text-sm text-red-700 font-mono">
                {error}
              </div>
            ))}
          </div>
        ) : (
          <div className="p-4 bg-green-50 border border-green-200 rounded-md text-sm text-green-700">
            Data is valid!
          </div>
        )}
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onDone={() => setToast(null)}
        />
      )}
    </div>
  );
}
