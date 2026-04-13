import { useState } from 'react';

export default function RegexTester() {
  const [pattern, setPattern] = useState<string>('');
  const [flags, setFlags] = useState<string>('g');

  
  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-3 items-start">
        <div className="flex-1 flex flex-col gap-1">
          <label htmlFor="regex-pattern" className="text-sm font-medium text-gray-700">
            Regex Pattern
          </label>
          <div className="flex items-center border border-gray-300 rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-blue-500">
            <span className="px-3 py-2 bg-gray-100 text-gray-500 select-none border-r border-gray-300 font-mono">/</span>
            <input
              id="regex-pattern"
              type="text"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              placeholder="e.g. \b\w+\b"
              className="flex-1 px-3 py-2 font-mono text-sm outline-none bg-white"
              spellCheck={false}
            />
            <span className="px-3 py-2 bg-gray-100 text-gray-500 select-none border-l border-gray-300 font-mono">/</span>
          </div>
        </div>

        <div className="flex flex-col gap-1 w-28">
          <label htmlFor="regex-flags" className="text-sm font-medium text-gray-700">
            Flags
          </label>
          <input
            id="regex-flags"
            type="text"
            value={flags}
            onChange={(e) => setFlags(e.target.value.replace(/[^gimsuy]/g, ''))}
            placeholder="gi"
            maxLength={6}
            className="w-full px-3 py-2 font-mono text-sm border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
            spellCheck={false}
          />
        </div>
      </div>

      {(!pattern.trim()) && (
        <p className="text-xs text-gray-400">Enter a pattern above to start matching.</p>
      )}
    </div>
  );
}
