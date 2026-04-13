import { useState, type ReactNode } from 'react';
import { Search, ChevronRight, Command } from 'lucide-react';

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

        <h2 style={{ color: '#fff', fontSize: '1.6rem', fontWeight: 700, marginTop: 48, marginBottom: 24 }}>
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

        <h2 style={{ color: '#fff', fontSize: '1.6rem', fontWeight: 700, marginTop: 48, marginBottom: 24 }}>
          Quick Action Guide
        </h2>
        <ol style={{ display: 'flex', flexDirection: 'column', gap: 16, paddingLeft: 20, marginBottom: 32 }}>
          <li>Select a tool from the <strong>Tools Dashboard</strong>.</li>
          <li>Paste your raw data into the <strong>Input Editor</strong>.</li>
          <li>Configure your transformation options (indentation, filtering, etc.).</li>
          <li>Export or copy your newly architected payload.</li>
        </ol>

        <h2 style={{ color: '#fff', fontSize: '1.6rem', fontWeight: 700, marginTop: 48, marginBottom: 24 }}>
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

        <h2 style={{ color: '#fff', fontSize: '1.6rem', fontWeight: 700, marginTop: 48, marginBottom: 24 }}>
          Our Privacy Commitment
        </h2>
        <p style={{ marginBottom: 32 }}>
          We do not store your data. We do not track your payloads. Even the API mock generation is performed
          using local templates, ensuring zero data leakage to third parties.
        </p>

        <div style={{ background: '#0a0a0a', border: '1px solid #1a1a1a', padding: 24, borderRadius: 8 }}>
          <h3 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: 12 }}>Client-Side Sanitization</h3>
          <p style={{ color: '#666', fontSize: '0.9rem' }}>
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

        <h2 style={{ color: '#fff', fontSize: '1.6rem', fontWeight: 700, marginTop: 48, marginBottom: 24 }}>
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

        <h2 style={{ color: '#fff', fontSize: '1.6rem', fontWeight: 700, marginTop: 48, marginBottom: 24 }}>
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
  const currentItem = CONTENT[activeId] || CONTENT['intro'];

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: 'calc(100vh - 120px)',
      background: '#000000',
      color: '#ffffff',
      fontFamily: 'var(--font-sans)',
      overflow: 'hidden',
      borderRadius: 12,
      border: '1px solid #1a1a1a',
      margin: '0 24px 24px 24px',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        padding: '0 24px',
        minHeight: 52,
        borderBottom: '1px solid #1a1a1a',
        gap: 32,
        background: '#050505',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.825rem', fontWeight: 600 }}>
          <span style={{ color: '#444' }}>JSONCraft</span>
          <ChevronRight size={14} color="#222" />
          <span style={{ color: '#3b82f6', fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>v1.0 docs</span>
        </div>

        <div style={{
          flex: 1,
          maxWidth: 320,
          height: 32,
          background: '#0a0a0a',
          border: '1px solid #1a1a1a',
          borderRadius: 6,
          display: 'flex',
          alignItems: 'center',
          padding: '0 12px',
          gap: 8,
          color: '#444',
        }}>
          <Search size={14} />
          <input placeholder='Search documentation...' style={{ fontSize: '0.8rem', flex: 1, background: 'transparent', border: 'none', outline: 'none', color: '#fff' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 2, fontSize: '0.65rem', background: '#000', padding: '2px 6px', borderRadius: 4, border: '1px solid #1a1a1a' }}>
            <Command size={10} /> K
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <aside style={{
          width: 250,
          borderRight: '1px solid #1a1a1a',
          padding: '24px 12px',
          display: 'flex',
          flexDirection: 'column',
          gap: 28,
          overflowY: 'auto',
          background: '#000000',
        }}>
          {GROUPS.map(group => (
            <div key={group.name}>
              <div style={{
                fontSize: '0.65rem',
                fontWeight: 800,
                color: '#333',
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
                        background: isActive ? 'rgba(255, 105, 180, 0.08)' : 'transparent',
                        color: isActive ? '#3b82f6' : '#666',
                        border: 'none',
                        borderRadius: 6,
                        cursor: 'pointer',
                        transition: 'all 0.15s',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                      onMouseOver={e => { if (!isActive) e.currentTarget.style.color = '#fff'; }}
                      onMouseOut={e => { if (!isActive) e.currentTarget.style.color = '#666'; }}
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
            background: '#000000',
            scrollbarWidth: 'none',
          }}
        >
          <div style={{ maxWidth: 740, margin: '0 auto', animation: 'fadeInUp 0.3s ease-out' }}>
            {/* Tag */}
            <div style={{
              fontSize: '0.72rem',
              fontWeight: 800,
              color: '#3b82f6',
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
              color: '#fff',
            }}>
              {currentItem.title}
            </h1>

            <p style={{
              fontSize: '1.25rem',
              color: '#555',
              marginBottom: 48,
              lineHeight: 1.5,
              fontWeight: 500,
              maxWidth: 600,
            }}>
              {currentItem.subtitle}
            </p>

            <div style={{ color: '#888', lineHeight: 1.8, fontSize: '1rem' }}>
              {currentItem.content}
            </div>
          </div>
        </main>

        <aside style={{
          width: 240,
          padding: '80px 24px',
          background: '#000000',
          borderLeft: '1px solid #1a1a1a',
          fontSize: '0.8rem',
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          overflowY: 'auto',
        }}>
          <div style={{ fontWeight: 700, color: '#fff', marginBottom: 8 }}>On this page</div>
          {currentItem.toc.map(section => (
            <div key={section} style={{
              color: '#666',
              cursor: 'pointer',
              transition: 'color 0.15s',
            }}
              onMouseOver={e => e.currentTarget.style.color = '#fff'}
              onMouseOut={e => e.currentTarget.style.color = '#666'}
            >
              {section}
            </div>
          ))}

          <div style={{ marginTop: 32 }}>
            <div style={{ color: '#333', fontWeight: 800, fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 16 }}>Available Tools</div>
            {['Formatter', 'Validator', 'Schema Gen', 'Mock Engine'].map(t => (
              <div key={t} style={{ color: '#666', marginBottom: 8, fontSize: '0.75rem' }}>{t}</div>
            ))}
          </div>
        </aside>
      </div>

      <style>{`
        body { padding: 0 !important; }
        ::-webkit-scrollbar { width: 4px; height: 0; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #1a1a1a; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: #222; }
        
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
