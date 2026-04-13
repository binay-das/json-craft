import { useState, useEffect } from 'react';
import { EditorPanel } from '../components/EditorPanel';

interface Match {
  text: string;
  index: number;
  groups: (string | undefined)[];
}

export default function RegexTester() {
  const [pattern, setPattern] = useState<string>('fox');
  const [flags, setFlags] = useState<string>('g');
  const [testString, setTestString] = useState<string>('The quick brown fox jumps over the lazy dog.');
  const [matches, setMatches] = useState<Match[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setError(null);
    if (!pattern.trim()) {
      setMatches([]);
      return;
    }

    try {
      const regex = new RegExp(pattern, flags);
      const newMatches: Match[] = [];

      if (flags.includes('g')) {
        let match;
        // Reset lastIndex because of 'g' flag if we reuse the regex
        regex.lastIndex = 0;
        while ((match = regex.exec(testString)) !== null) {
          // Prevent infinite loops with zero-width matches
          if (match.index === regex.lastIndex && match[0].length === 0) {
            regex.lastIndex++;
          }
          newMatches.push({
            text: match[0],
            index: match.index,
            groups: match.slice(1),
          });
        }
      } else {
        const match = regex.exec(testString);
        if (match) {
          newMatches.push({
            text: match[0],
            index: match.index,
            groups: match.slice(1),
          });
        }
      }
      setMatches(newMatches);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Invalid regular expression');
      setMatches([]);
    }
  }, [pattern, flags, testString]);

  const escapeHtml = (text: string) => {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  };

  const getHighlightedText = () => {
    if (!testString) return '';
    if (matches.length === 0) return escapeHtml(testString);

    let result = '';
    let lastIndex = 0;

    matches.forEach((match) => {
      result += escapeHtml(testString.substring(lastIndex, match.index));
      result += `<mark class="bg-yellow-200 text-yellow-900 rounded-sm px-0.5">${escapeHtml(match.text)}</mark>`;
      lastIndex = match.index + match.text.length;
    });

    // Add remaining text
    result += escapeHtml(testString.substring(lastIndex));
    return result;
  };

  return (
    <div className="flex flex-col gap-6">
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-md flex items-start gap-3 text-red-700 animate-[fadeInUp_0.2s_ease-out]">
          <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <div className="flex flex-col gap-1">
            <span className="font-bold text-sm underline decoration-red-200">Invalid Regular Expression</span>
            <code className="text-xs bg-red-100/50 p-1 rounded font-mono">{error}</code>
          </div>
        </div>
      )}

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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            Test String
          </label>
          <EditorPanel
            value={testString}
            onChange={(val) => setTestString(val || '')}
            language="plaintext"
            label="Input string to test matches"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            Preview
          </label>
          <div 
            className="flex-1 min-h-[400px] border border-gray-300 rounded-md p-4 bg-white overflow-auto font-mono text-sm whitespace-pre-wrap break-all"
            dangerouslySetInnerHTML={{ __html: getHighlightedText() || '<span class="text-gray-400 italic">No matches to highlight</span>' }}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
          Match Details
          <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs font-normal">
            {matches.length} matches
          </span>
        </h3>
        
        {matches.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {matches.map((match, i) => (
              <div key={i} className="p-3 border border-gray-200 rounded-md bg-gray-50 flex flex-col gap-1">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Match {i + 1}</span>
                  <span className="text-[10px] text-gray-500 font-mono">Index: {match.index}</span>
                </div>
                <div className="text-sm font-mono truncate bg-white p-1.5 border border-gray-100 rounded">
                  {match.text || <span className="text-gray-400 italic">Zero-width match</span>}
                </div>
                {match.groups.length > 0 && (
                  <div className="mt-2 flex flex-col gap-1">
                    <span className="text-[10px] font-semibold text-gray-400 uppercase">Groups</span>
                    <div className="flex flex-wrap gap-1">
                      {match.groups.map((group, groupIdx) => (
                        <div key={groupIdx} className="flex items-center gap-1 px-1.5 py-0.5 bg-blue-50 border border-blue-100 rounded text-[10px] font-mono text-blue-700">
                          <span className="opacity-50">${groupIdx + 1}:</span>
                          <span className="font-bold">{group === undefined ? 'undefined' : group}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 border border-dashed border-gray-300 rounded-md text-center text-gray-500 text-sm">
            No matches found.
          </div>
        )}
      </div>

      {(!pattern.trim()) && (
        <p className="text-xs text-gray-400">Enter a pattern above to start matching.</p>
      )}
    </div>
  );
}
