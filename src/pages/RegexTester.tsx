import { useState, useEffect } from 'react';
import { EditorPanel } from '../components/EditorPanel';

interface Match {
  text: string;
  index: number;
  groups: (string | undefined)[];
}

const inputStyle: React.CSSProperties = {
  background: 'var(--bg-elevated)',
  border: '1px solid var(--border)',
  borderRadius: 8,
  padding: '8px 12px',
  color: 'var(--text-primary)',
  fontSize: '0.875rem',
  fontFamily: 'var(--font-mono)',
  outline: 'none',
  transition: 'border-color 0.15s',
};

export default function RegexTester() {
  const [pattern, setPattern] = useState<string>('fox');
  const [flags, setFlags] = useState<string>('g');
  const [testString, setTestString] = useState<string>('The quick brown fox jumps over the lazy dog.');
  const [matches, setMatches] = useState<Match[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setError(null);
    if (!pattern.trim()) { setMatches([]); return; }
    try {
      const regex = new RegExp(pattern, flags);
      const newMatches: Match[] = [];
      if (flags.includes('g')) {
        regex.lastIndex = 0;
        let match;
        while ((match = regex.exec(testString)) !== null) {
          if (match.index === regex.lastIndex && match[0].length === 0) regex.lastIndex++;
          newMatches.push({ text: match[0], index: match.index, groups: match.slice(1) });
        }
      } else {
        const match = regex.exec(testString);
        if (match) newMatches.push({ text: match[0], index: match.index, groups: match.slice(1) });
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
    matches.forEach(match => {
      result += escapeHtml(testString.substring(lastIndex, match.index));
      result += `<mark style="background:rgba(245,158,11,0.25);color:#f59e0b;border-radius:3px;padding:0 2px;">${escapeHtml(match.text)}</mark>`;
      lastIndex = match.index + match.text.length;
    });
    result += escapeHtml(testString.substring(lastIndex));
    return result;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Error */}
      {error && (
        <div style={{
          padding: '10px 14px', borderRadius: 8,
          background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
          color: '#ef4444', fontSize: '0.85rem',
        }}>
          <strong>✕ Invalid Regex:</strong> <code style={{ fontFamily: 'var(--font-mono)' }}>{error}</code>
        </div>
      )}

      {/* Pattern input row */}
      <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end' }}>
        <div style={{ flex: 1 }}>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>
            Pattern
          </label>
          <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border)', borderRadius: 8, overflow: 'hidden', background: 'var(--bg-elevated)' }}>
            <span style={{ padding: '8px 12px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '1rem', borderRight: '1px solid var(--border)', userSelect: 'none' }}>/</span>
            <input
              id="regex-pattern"
              type="text"
              value={pattern}
              onChange={e => setPattern(e.target.value)}
              placeholder="e.g. \b\w+\b"
              spellCheck={false}
              style={{ flex: 1, padding: '8px 12px', background: 'transparent', border: 'none', color: 'var(--text-primary)', fontFamily: 'var(--font-mono)', fontSize: '0.875rem', outline: 'none' }}
            />
            <span style={{ padding: '8px 12px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '1rem', borderLeft: '1px solid var(--border)', userSelect: 'none' }}>/</span>
          </div>
        </div>
        <div style={{ width: 110 }}>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>
            Flags
          </label>
          <input
            id="regex-flags"
            type="text"
            value={flags}
            onChange={e => setFlags(e.target.value.replace(/[^gimsuy]/g, ''))}
            placeholder="gi"
            maxLength={6}
            spellCheck={false}
            style={inputStyle}
          />
        </div>
      </div>

      {/* Editors */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <EditorPanel
          value={testString}
          onChange={val => setTestString(val || '')}
          language="plaintext"
          label="Test String"
        />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{
            fontSize: '0.72rem', fontWeight: 600, fontFamily: 'var(--font-mono)',
            color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6,
          }}>
            Highlighted Preview
          </div>
          <div
            style={{
              flex: 1, minHeight: 420,
              border: '1px solid var(--border)', borderRadius: 10,
              padding: '14px 16px', background: 'var(--bg-surface)',
              overflowY: 'auto', fontFamily: 'var(--font-mono)', fontSize: '0.85rem',
              lineHeight: 1.8, whiteSpace: 'pre-wrap', wordBreak: 'break-all',
              color: 'var(--text-primary)',
            }}
            dangerouslySetInnerHTML={{
              __html: getHighlightedText() || '<span style="color:var(--text-muted);font-style:italic;">No matches to highlight</span>'
            }}
          />
        </div>
      </div>

      {/* Match details */}
      <div>
        <h3 style={{ fontSize: '0.8rem', fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
          Match Details
          <span style={{ padding: '2px 8px', borderRadius: 999, background: 'var(--bg-elevated)', border: '1px solid var(--border)', color: 'var(--text-secondary)', fontWeight: 400 }}>
            {matches.length} matches
          </span>
        </h3>
        {matches.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 10 }}>
            {matches.map((match, i) => (
              <div key={i} style={{
                padding: '12px 14px',
                background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 10,
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#3b82f6', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>Match {i + 1}</span>
                  <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>idx: {match.index}</span>
                </div>
                <div style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.82rem',
                  background: 'var(--bg-elevated)', padding: '6px 10px', borderRadius: 6,
                  color: '#f59e0b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                }}>
                  {match.text || <em style={{ color: 'var(--text-muted)' }}>Zero-width</em>}
                </div>
                {match.groups.length > 0 && (
                  <div style={{ marginTop: 8 }}>
                    <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: 4 }}>GROUPS</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                      {match.groups.map((group, gi) => (
                        <span key={gi} style={{
                          padding: '2px 7px', borderRadius: 5,
                          background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.2)',
                          fontSize: '0.7rem', fontFamily: 'var(--font-mono)', color: '#60a5fa',
                        }}>
                          ${gi + 1}: {group === undefined ? 'undef' : group}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div style={{
            padding: '32px', textAlign: 'center',
            border: '1px dashed var(--border)', borderRadius: 10,
            color: 'var(--text-muted)', fontSize: '0.85rem',
          }}>
            {pattern.trim() ? 'No matches found.' : 'Enter a pattern above to start matching.'}
          </div>
        )}
      </div>
    </div>
  );
}
