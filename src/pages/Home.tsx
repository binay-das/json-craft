import { Link } from 'react-router-dom';
import { ROUTES } from '../config/routes';
import { TOOLS } from '../config/tools';
import {
  Zap, GitBranch, Globe, Package,
  FileJson, Replace, Code2, Database, Search, ShieldCheck, Layers,
  ChevronRight, ArrowRight,
} from 'lucide-react';

const S = {
  section: (extra: React.CSSProperties = {}): React.CSSProperties => ({
    maxWidth: 1100, margin: '0 auto', padding: '0 24px', ...extra,
  }),
  card: (extra: React.CSSProperties = {}): React.CSSProperties => ({
    background: 'var(--bg-card)',
    border: '1px solid var(--border)',
    borderRadius: 14,
    padding: '24px 20px',
    transition: 'border-color 0.2s, box-shadow 0.2s, transform 0.2s',
    cursor: 'pointer',
    textDecoration: 'none',
    display: 'block',
    color: 'inherit',
    ...extra,
  }),
};

const CODE_LINES = [
  { indent: 0, content: '{', color: '#e8edf5' },
  { indent: 1, content: '"object": {', color: '#60a5fa' },
  { indent: 2, content: '"name": "JSONCraft",', color: '#e8edf5' },
  { indent: 2, content: '"status": "optimized",', color: '#e8edf5' },
  { indent: 2, content: '"fidelity": 0.99,', color: '#e8edf5' },
  { indent: 2, content: '"is_awesome": true', color: '#22d3a5' },
  { indent: 1, content: '}', color: '#60a5fa' },
  { indent: 0, content: '}', color: '#e8edf5' },
];

const STATS = [
  { icon: <FileJson size={13} />, label: '6+ Interfaces' },
  { icon: <Zap size={13} />, label: '0% API Access' },
  { icon: <Globe size={13} />, label: 'GitHub Reference' },
  { icon: <Package size={13} />, label: 'Powered by GPT' },
];

const TOOL_ICONS: Record<string, React.ReactNode> = {
  'json-formatter':    <FileJson size={20} />,
  'csv-to-json':       <Replace  size={20} />,
  'json-schema':       <Code2    size={20} />,
  'api-mock':          <Database size={20} />,
  'regex-tester':      <Search   size={20} />,
  'data-validator':    <ShieldCheck size={20} />,
};

const TOOL_COLORS: Record<string, string> = {
  'json-formatter': '#3b82f6',
  'csv-to-json':    '#22d3a5',
  'json-schema':    '#f59e0b',
  'api-mock':       '#3b82f6',
  'regex-tester':   '#22d3a5',
  'data-validator': '#f59e0b',
};

const TECHS = ['React', 'Vite', 'Tailwind', 'TypeScript'];

export default function Home() {
  return (
    <div style={{ overflowX: 'hidden' }}>
      <section style={{
        paddingTop: 80, paddingBottom: 80,
        background: 'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(59,130,246,0.12) 0%, transparent 60%)',
      }}>
        <div style={S.section({ textAlign: 'center' })}>
          {/* Badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '4px 14px', borderRadius: 999,
            background: 'var(--bg-elevated)', border: '1px solid var(--border)',
            fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: 28,
            fontFamily: 'var(--font-mono)',
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22d3a5', display: 'inline-block' }} />
            v1.0 · The JSON Architect's Toolkit
          </div>


          <h1 style={{
            fontSize: 'clamp(2.4rem, 6vw, 4.2rem)',
            fontWeight: 900,
            letterSpacing: '-0.04em',
            lineHeight: 1.08,
            marginBottom: 24,
            color: 'var(--text-primary)',
          }}>
            Forge Better{' '}
            <span style={{
              background: 'linear-gradient(95deg, #60a5fa 0%, #22d3a5 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Data, Faster.
            </span>
          </h1>

          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.15rem)',
            color: 'var(--text-secondary)',
            maxWidth: 560, margin: '0 auto 36px',
            lineHeight: 1.7,
          }}>
            A precision instrument for modern engineers. Validate, convert, and
            architect JSON structures with terminal-grade speed and editorial-grade clarity.
          </p>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 64 }}>
            <Link
              to={ROUTES.TOOLS}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '11px 28px', borderRadius: 10,
                background: '#3b82f6', color: '#fff',
                fontWeight: 600, fontSize: '0.9rem', textDecoration: 'none',
                transition: 'opacity 0.15s, transform 0.15s',
                boxShadow: '0 0 32px rgba(59,130,246,0.35)',
              }}
              onMouseOver={e => { (e.currentTarget as HTMLElement).style.opacity = '0.88'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'; }}
              onMouseOut={e => { (e.currentTarget as HTMLElement).style.opacity = '1'; (e.currentTarget as HTMLElement).style.transform = 'none'; }}
            >
              Start Crafting
            </Link>
            <Link
              to={ROUTES.TOOLS}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '11px 28px', borderRadius: 10,
                background: 'var(--bg-elevated)', color: 'var(--text-primary)',
                border: '1px solid var(--border)',
                fontWeight: 600, fontSize: '0.9rem', textDecoration: 'none',
                transition: 'border-color 0.15s, transform 0.15s',
              }}
              onMouseOver={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(59,130,246,0.5)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'; }}
              onMouseOut={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; (e.currentTarget as HTMLElement).style.transform = 'none'; }}
            >
              Browse Tools
            </Link>
          </div>

          <div style={{
            maxWidth: 720, margin: '0 auto',
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border)',
            borderRadius: 16,
            overflow: 'hidden',
            boxShadow: '0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04)',
            animation: 'fadeInUp 0.6s ease-out 0.1s both',
          }}>

            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '10px 16px',
              background: 'var(--bg-surface)',
              borderBottom: '1px solid var(--border)',
            }}>
              <div style={{ display: 'flex', gap: 7 }}>
                {['#ef4444','#f59e0b','#22c55e'].map(c => (
                  <div key={c} style={{ width: 12, height: 12, borderRadius: '50%', background: c }} />
                ))}
              </div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                EDITOR — PAYLOAD.JSON
              </span>
              <div style={{ width: 60 }} />
            </div>

            <div style={{ padding: '20px 24px', textAlign: 'left' }}>
              <pre style={{ fontFamily: 'var(--font-mono)', fontSize: '0.88rem', lineHeight: 1.85, margin: 0 }}>
                {CODE_LINES.map((line, i) => (
                  <div key={i} style={{ color: line.color }}>
                    {'  '.repeat(line.indent)}{line.content}
                  </div>
                ))}
              </pre>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 10, marginTop: 28 }}>
            {STATS.map((s, i) => (
              <div key={i} className="stat-chip">
                <span style={{ color: '#3b82f6' }}>{s.icon}</span>
                {s.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={{ borderTop: '1px solid var(--border)', opacity: 0.4 }} />

      <section style={{ padding: '80px 0' }}>
        <div style={S.section()}>
          <div style={{ marginBottom: 40 }}>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 10 }}>
              Precision Utilities
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: 480, lineHeight: 1.7 }}>
              Every architect needs a dedicated set of tools. Our utilities are optimised
              for speed and reliability in major data development environments.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
            gap: 16,
          }}>
            {TOOLS.map((tool) => {
              const color = TOOL_COLORS[tool.id] ?? '#3b82f6';
              const icon  = TOOL_ICONS[tool.id] ?? <FileJson size={20} />;
              return (
                <Link
                  key={tool.id}
                  to={tool.href}
                  style={S.card()}
                  onMouseOver={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = `${color}55`;
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)';
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 12px 40px rgba(0,0,0,0.35)`;
                  }}
                  onMouseOut={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
                    (e.currentTarget as HTMLElement).style.transform = 'none';
                    (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                  }}
                >

                  <div style={{
                    width: 42, height: 42, borderRadius: 10,
                    background: `${color}18`, border: `1px solid ${color}30`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color, marginBottom: 16,
                  }}>
                    {icon}
                  </div>
                  <h3 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: 6, color: 'var(--text-primary)' }}>
                    {tool.name}
                  </h3>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 14 }}>
                    {tool.description}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.78rem', color, fontWeight: 600 }}>
                    TRY IT <ChevronRight size={13} />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section style={{ padding: '0 0 80px' }}>
        <div style={S.section()}>
          <div style={{
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border)',
            borderRadius: 18,
            padding: '48px 40px',
            display: 'flex', alignItems: 'center', gap: 48, flexWrap: 'wrap',
            position: 'relative', overflow: 'hidden',
          }}>

            <div style={{
              position: 'absolute', top: -60, left: -60,
              width: 240, height: 240, borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)',
              pointerEvents: 'none',
            }} />

            <div style={{
              width: 72, height: 72, borderRadius: 18,
              background: 'linear-gradient(135deg, rgba(59,130,246,0.25), rgba(34,211,165,0.1))',
              border: '1px solid rgba(59,130,246,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0, animation: 'float 4s ease-in-out infinite',
            }}>
              <Layers size={34} color="#3b82f6" />
            </div>

            <div style={{ flex: 1, minWidth: 220 }}>
              <div style={{
                display: 'inline-block', marginBottom: 8,
                fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase',
                letterSpacing: '0.12em', color: '#3b82f6',
                fontFamily: 'var(--font-mono)',
              }}>
                ALWAYS FOR FREE
              </div>
              <h2 style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 10 }}>
                Mock Data Engine
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.7, maxWidth: 480, marginBottom: 24 }}>
                Generate dynamic, real-de datasets for testing. Support for faking nested
                sub-arrays, UUIDs, and custom relational schemas.
              </p>
              <Link
                to={ROUTES.TOOLS}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '9px 22px', borderRadius: 9,
                  background: 'var(--bg-card)', border: '1px solid var(--border)',
                  color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.85rem',
                  textDecoration: 'none', transition: 'border-color 0.15s, transform 0.15s',
                }}
                onMouseOver={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(59,130,246,0.5)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'; }}
                onMouseOut={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; (e.currentTarget as HTMLElement).style.transform = 'none'; }}
              >
                Launch Engine <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>


      <section style={{
        padding: '72px 0',
        background: 'var(--bg-surface)',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
      }}>
        <div style={S.section({ display: 'flex', alignItems: 'center', gap: 64, flexWrap: 'wrap' })}>
          <div style={{ flex: 1, minWidth: 220 }}>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 12 }}>
              Built for Reliability
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.7, maxWidth: 380 }}>
              JSONCraft is architected with modern industry standards, ensuring sub-millisecond
              processing even for multi-megabyte payloads.
            </p>
          </div>

          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', alignItems: 'center' }}>
            {TECHS.map(t => (
              <div key={t} style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
              }}>
                <div style={{
                  width: 52, height: 52, borderRadius: 12,
                  background: 'var(--bg-card)', border: '1px solid var(--border)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <TechIcon name={t} />
                </div>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{
        padding: '100px 24px',
        textAlign: 'center',
        background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(59,130,246,0.08) 0%, transparent 70%)',
      }}>
        <h2 style={{
          fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 900,
          letterSpacing: '-0.04em', lineHeight: 1.1, marginBottom: 16,
          color: 'var(--text-primary)',
        }}>
          Ready to upgrade your<br />workflow?
        </h2>
        <p style={{
          color: 'var(--text-secondary)', fontSize: '0.95rem',
          maxWidth: 420, margin: '0 auto 36px', lineHeight: 1.7,
        }}>
          Join thousands of developers using JSONCraft to maintain data integrity across
          their microservices and applications.
        </p>
        <Link
          to={ROUTES.TOOLS}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '13px 32px', borderRadius: 12,
            background: '#3b82f6', color: '#fff',
            fontWeight: 700, fontSize: '0.95rem', textDecoration: 'none',
            boxShadow: '0 0 40px rgba(59,130,246,0.4)',
            transition: 'opacity 0.15s, transform 0.15s',
          }}
          onMouseOver={e => { (e.currentTarget as HTMLElement).style.opacity = '0.85'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
          onMouseOut={e => { (e.currentTarget as HTMLElement).style.opacity = '1'; (e.currentTarget as HTMLElement).style.transform = 'none'; }}
        >
          Forge JSON Now
        </Link>
      </section>

    </div>
  );
}

function TechIcon({ name }: { name: string }) {
  const size = 26;
  switch (name) {
    case 'React':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="2.5" fill="#61dafb"/>
          <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61dafb" strokeWidth="1.2" fill="none"/>
          <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61dafb" strokeWidth="1.2" fill="none" transform="rotate(60 12 12)"/>
          <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61dafb" strokeWidth="1.2" fill="none" transform="rotate(120 12 12)"/>
        </svg>
      );
    case 'Vite':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 3L13.5 20l-2-5.5L3 10.5l18-7.5z" fill="#f0b429"/>
          <path d="M13.5 20L11.5 14.5 8 16l5.5 4z" fill="#f0b429" opacity="0.5"/>
        </svg>
      );
    case 'Tailwind':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 6C9.6 6 8.1 7.2 7.5 9.6c.9-1.2 1.95-1.65 3.15-1.35.685.171 1.174.667 1.716 1.216C13.313 10.44 14.388 11.55 16.5 11.55c2.4 0 3.9-1.2 4.5-3.6-.9 1.2-1.95 1.65-3.15 1.35-.685-.171-1.174-.667-1.716-1.216C15.187 7.11 14.112 6 12 6zM7.5 11.55C5.1 11.55 3.6 12.75 3 15.15c.9-1.2 1.95-1.65 3.15-1.35.685.171 1.174.667 1.716 1.216 .951.969 2.026 2.079 4.134 2.079 2.4 0 3.9-1.2 4.5-3.6-.9 1.2-1.95 1.65-3.15 1.35-.685-.171-1.174-.667-1.716-1.216C10.687 12.66 9.612 11.55 7.5 11.55z" fill="#38bdf8"/>
        </svg>
      );
    case 'TypeScript':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="3" fill="#3178c6"/>
          <path d="M14.5 11.5h-2v6h-1.5v-6h-2V10h5.5v1.5zM15.5 15.5c.3.3.75.5 1.25.5s.9-.15 1.1-.4c.2-.25.15-.55-.05-.75-.2-.2-.5-.3-1-.45-.5-.15-1-.4-1.3-.7-.3-.3-.45-.7-.4-1.2.05-.5.3-.9.7-1.2.4-.3.9-.45 1.5-.45.6 0 1.1.15 1.5.4l-.5 1.1c-.25-.2-.6-.3-1-.3-.4 0-.65.15-.75.4-.1.25-.05.45.15.6.2.15.55.3 1.05.45.5.15.9.4 1.2.7.3.3.4.75.35 1.3-.05.55-.3 1-.75 1.3-.45.3-1 .45-1.65.45-.65 0-1.2-.2-1.65-.55l.55-1.2z" fill="white"/>
        </svg>
      );
    default:
      return <GitBranch size={size} color="var(--text-muted)" />;
  }
}
