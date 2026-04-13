import { useState, type ReactNode } from 'react';
import { Search, ChevronRight, Command } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface DocItem {
  id: string;
  title: string;
  subtitle: string;
  content: ReactNode;
  toc: string[];
}

const CONTENT: Record<string, DocItem> = {
  'intro': {
    id: 'intro',
    title: 'Everything you need to know',
    subtitle: 'Master the art of JSON manipulation with high-performance architect tools.',
    toc: ['Overview', 'Key Features', 'Local-Only Engine', 'Developer Experience'],
    content: (
      <>
        <p style={{ marginBottom: 32 }}>
          JSONCraft provides a comprehensive suite of tools designed for modern engineers.
          Unlike traditional online utilities, every operation is performed locally, ensuring
          absolute privacy and terminal-grade speed.
        </p>

        <h2 style={{ fontSize: '1.6rem', fontWeight: 700, marginTop: 48, marginBottom: 24, color: 'var(--text-primary)' }}>
          Understanding the Architecture
        </h2>
        <p style={{ marginBottom: 24 }}>
          The JSON tools you use are <strong>Local</strong>. They read files on your hard drive or run scripts on your machine.
          JSONCraft brings this same performance to a web interface without compromising on the depth of features.
        </p>
        <p style={{ marginBottom: 32 }}>
          Because it is optimized for high-volume data, it requires a clear understanding of its internal engines—the formatter,
          the validator, and the schema generator.
        </p>
      </>
    )
  },
  'getting-started': {
    id: 'getting-started',
    title: 'Getting Started',
    subtitle: 'Quickly set up JSONCraft in your local environment and begin your first data transformation.',
    toc: ['Quick Start', 'Core Concepts', 'First Format', 'Help & Support'],
    content: (
      <>
        <p style={{ marginBottom: 32 }}>
          Getting started with JSONCraft is as simple as visiting the URL. Since it is a client-side application,
          there are no servers to configure or accounts to create.
        </p>

        <h2 style={{ fontSize: '1.6rem', fontWeight: 700, marginTop: 48, marginBottom: 24, color: 'var(--text-primary)' }}>
          Quick Action Guide
        </h2>
        <ol style={{ display: 'flex', flexDirection: 'column', gap: 16, paddingLeft: 20, marginBottom: 32 }}>
          <li>Select a tool from the <strong>Tools Dashboard</strong>.</li>
          <li>Paste your raw data into the <strong>Input Editor</strong>.</li>
          <li>Configure your transformation options (indentation, filtering, etc.).</li>
          <li>Export or copy your newly architected payload.</li>
        </ol>

        <h2 style={{ fontSize: '1.6rem', fontWeight: 700, marginTop: 48, marginBottom: 24, color: 'var(--text-primary)' }}>
          Pro Tips
        </h2>
        <p>
          Utilize <code>Ctrl + K</code> to quickly search the documentation or jump between tools using the top navigation bar.
        </p>
      </>
    )
  },
  'privacy': {
    id: 'privacy',
    title: 'Privacy & Security',
    subtitle: 'Your data is your own. We designed JSONCraft to ensure it stays that way.',
    toc: ['Privacy Commitment', 'No Telemetry', 'Encryption', 'Offline Mode'],
    content: (
      <>
        <p style={{ marginBottom: 32 }}>
          The cornerstone of JSONCraft is our <strong>Local-Only</strong> philosophy. We don't send your JSON payloads to
          any remote server. The processing happens in your browser's memory.
        </p>

        <h2 style={{ fontSize: '1.6rem', fontWeight: 700, marginTop: 48, marginBottom: 24, color: 'var(--text-primary)' }}>
          Our Privacy Commitment
        </h2>
        <p style={{ marginBottom: 32 }}>
          We do not store your data. We do not track your payloads. Even the API mock generation is performed
          using local templates, ensuring zero data leakage to third parties.
        </p>

        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', padding: 24, borderRadius: 8 }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: 12, color: 'var(--text-primary)' }}>Client-Side Sanitization</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Before any transformation starts, our engine sanitizes the input locally. This ensures that even
            malformed or malicious JSON cannot affect your browser stability.
          </p>
        </div>
      </>
    )
  },
  'formatting': {
    id: 'formatting',
    title: 'Formatting Engine',
    subtitle: 'A precision instrument for prettifying and minifying complex data structures.',
    toc: ['Basic Formatting', 'Custom Indentation', 'Minification', 'Validation'],
    content: (
      <>
        <p style={{ marginBottom: 32 }}>
          Our formatter is powered by a high-performance parser that can handle datasets exceeding 100,000 lines
          with no visible UI latency.
        </p>

        <h2 style={{ fontSize: '1.6rem', fontWeight: 700, marginTop: 48, marginBottom: 24, color: 'var(--text-primary)' }}>
          Key Options
        </h2>
        <ul style={{ display: 'flex', flexDirection: 'column', gap: 12, listStyle: 'none', padding: 0 }}>
          <li>• <strong>Indentation:</strong> Choose between tabs or 2/4 spaces.</li>
          <li>• <strong>Key Quoting:</strong> Ensure keys are properly quoted for standard compliance.</li>
          <li>• <strong>Compact Mode:</strong> Strip all whitespace for lightweight production payloads.</li>
        </ul>
      </>
    )
  },
  'validation': {
    id: 'validation',
    title: 'Validation & Schemas',
    subtitle: 'Enforce structural integrity and generate definitions instantly.',
    toc: ['Syntax Check', 'Schema Mapping', 'Error Reporting', 'Best Practices'],
    content: (
      <>
        <p style={{ marginBottom: 32 }}>
          JSONCraft provides real-time validation against the JSON standard. Our engine highlights errors
          at the exact line and character, making debugging effortless.
        </p>

        <h2 style={{ fontSize: '1.6rem', fontWeight: 700, marginTop: 48, marginBottom: 24, color: 'var(--text-primary)' }}>
          Schema Generation
        </h2>
        <p style={{ marginBottom: 32 }}>
          By scanning your payload, we can automatically derive a Draft-07 JSON Schema. This allows you to
          rapidly protoype data contracts without manual effort.
        </p>
      </>
    )
  }
};

const GROUPS = [
  {
    name: 'LEARN',
    items: [
      { id: 'intro', title: 'Everything you need to know' },
      { id: 'getting-started', title: 'Getting Started' },
      { id: 'privacy', title: 'Privacy & Security' },
    ]
  },
  {
    name: 'TOOLS',
    items: [
      { id: 'formatting', title: 'Formatting Engine' },
      { id: 'validation', title: 'Validation & Schemas' },
    ]
  }
];

export default function Docs() {
  const [activeId, setActiveId] = useState('intro');
  const { isDark } = useTheme();
  const currentItem = CONTENT[activeId] || CONTENT['intro'];

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: 'calc(100vh - 120px)',
      background: 'var(--bg-base)',
      color: 'var(--text-primary)',
      fontFamily: 'var(--font-sans)',
      overflow: 'hidden',
      borderRadius: 12,
      border: '1px solid var(--border)',
      margin: '0 24px 24px 24px',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        padding: '0 24px',
        minHeight: 52,
        borderBottom: '1px solid var(--border)',
        gap: 32,
        background: 'var(--bg-surface)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.825rem', fontWeight: 600 }}>
          <span style={{ color: 'var(--text-muted)' }}>JSONCraft</span>
          <ChevronRight size={14} color="var(--border)" />
          <span style={{ color: '#3b82f6', fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>v1.0 docs</span>
        </div>

        <div style={{
          flex: 1,
          maxWidth: 320,
          height: 32,
          background: 'var(--bg-elevated)',
          border: '1px solid var(--border)',
          borderRadius: 6,
          display: 'flex',
          alignItems: 'center',
          padding: '0 12px',
          gap: 8,
          color: 'var(--text-muted)',
        }}>
          <Search size={14} />
          <input
            placeholder='Search documentation...'
            style={{
              fontSize: '0.8rem', flex: 1, background: 'transparent',
              border: 'none', outline: 'none', color: 'var(--text-primary)',
            }}
          />
          <div style={{
            display: 'flex', alignItems: 'center', gap: 2, fontSize: '0.65rem',
            background: 'var(--bg-card)', padding: '2px 6px', borderRadius: 4,
            border: '1px solid var(--border)',
          }}>
            <Command size={10} /> K
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <aside style={{
          width: 250,
          borderRight: '1px solid var(--border)',
          padding: '24px 12px',
          display: 'flex',
          flexDirection: 'column',
          gap: 28,
          overflowY: 'auto',
          background: 'var(--bg-base)',
        }}>
          {GROUPS.map(group => (
            <div key={group.name}>
              <div style={{
                fontSize: '0.65rem',
                fontWeight: 800,
                color: 'var(--text-muted)',
                letterSpacing: '0.1em',
                marginBottom: 12,
                paddingLeft: 12,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                {group.name}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {group.items.map(item => {
                  const isActive = activeId === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveId(item.id)}
                      style={{
                        padding: '7px 12px',
                        fontSize: '0.825rem',
                        fontWeight: isActive ? 600 : 400,
                        textAlign: 'left',
                        background: isActive ? 'var(--accent-glow)' : 'transparent',
                        color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
                        border: 'none',
                        borderRadius: 6,
                        cursor: 'pointer',
                        transition: 'all 0.15s',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                      onMouseOver={e => { if (!isActive) e.currentTarget.style.color = 'var(--text-primary)'; }}
                      onMouseOut={e => { if (!isActive) e.currentTarget.style.color = 'var(--text-secondary)'; }}
                    >
                      {item.title}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </aside>

        <main
          key={activeId}
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '80px 60px',
            background: 'var(--bg-base)',
            scrollbarWidth: 'none',
          }}
        >
          <div style={{ maxWidth: 740, margin: '0 auto', animation: 'fadeInUp 0.3s ease-out' }}>
            <div style={{
              fontSize: '0.72rem',
              fontWeight: 800,
              color: 'var(--accent)',
              letterSpacing: '0.15em',
              marginBottom: 16,
              textTransform: 'uppercase',
            }}>
              {GROUPS.find(g => g.items.some(i => i.id === activeId))?.name || 'LEARN'}
            </div>

            <h1 style={{
              fontSize: '4.2rem',
              fontWeight: 900,
              letterSpacing: '-0.05em',
              lineHeight: 1,
              marginBottom: 20,
              color: 'var(--text-primary)',
            }}>
              {currentItem.title}
            </h1>

            <p style={{
              fontSize: '1.25rem',
              color: 'var(--text-secondary)',
              marginBottom: 48,
              lineHeight: 1.5,
              fontWeight: 500,
              maxWidth: 600,
            }}>
              {currentItem.subtitle}
            </p>

            <div style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1rem' }}>
              {currentItem.content}
            </div>
          </div>
        </main>

        <aside style={{
          width: 240,
          padding: '80px 24px',
          background: 'var(--bg-base)',
          borderLeft: '1px solid var(--border)',
          fontSize: '0.8rem',
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          overflowY: 'auto',
        }}>
          <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>On this page</div>
          {currentItem.toc.map(section => (
            <div key={section} style={{
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              transition: 'color 0.15s',
            }}
              onMouseOver={e => (e.currentTarget.style.color = 'var(--text-primary)')}
              onMouseOut={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
            >
              {section}
            </div>
          ))}

          <div style={{ marginTop: 32 }}>
            <div style={{
              color: 'var(--text-muted)', fontWeight: 800, fontSize: '0.65rem',
              textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 16,
            }}>Available Tools</div>
            {['Formatter', 'Validator', 'Schema Gen', 'Mock Engine'].map(t => (
              <div key={t} style={{ color: 'var(--text-secondary)', marginBottom: 8, fontSize: '0.75rem' }}>{t}</div>
            ))}
          </div>
        </aside>
      </div>

      <style>{`
        ::-webkit-scrollbar { width: 4px; height: 0; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: var(--text-muted); }
      `}</style>
    </div>
  );
}
