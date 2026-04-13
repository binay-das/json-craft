import { Link } from 'react-router-dom';
import { TOOLS } from '../config/tools';
import { ChevronRight } from 'lucide-react';

const TOOL_COLORS: Record<string, string> = {
  'json-formatter': '#3b82f6',
  'csv-to-json':    '#22d3a5',
  'json-schema':    '#f59e0b',
  'api-mock':       '#3b82f6',
  'regex-tester':   '#22d3a5',
  'data-validator': '#f59e0b',
};

export default function Tools() {
  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 24px' }}>
      {/* Header */}
      <div style={{ marginBottom: 36 }}>
        <div style={{
          display: 'inline-block', marginBottom: 10,
          fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase',
          letterSpacing: '0.12em', color: '#3b82f6',
          fontFamily: 'var(--font-mono)',
        }}>
          ALL TOOLS
        </div>
        <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', fontWeight: 900, letterSpacing: '-0.04em', marginBottom: 10, color: 'var(--text-primary)' }}>
          Developer Utilities
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: 520, lineHeight: 1.7 }}>
          A precision collection of JSON tools for modern engineers. All transformations run locally in your browser.
        </p>
      </div>

      {/* Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: 16,
      }}>
        {TOOLS.map((tool) => {
          const Icon = tool.icon;
          const color = TOOL_COLORS[tool.id] ?? '#3b82f6';
          return (
            <Link
              key={tool.id}
              to={tool.href}
              style={{
                display: 'flex', flexDirection: 'column',
                padding: '22px 20px',
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: 14,
                textDecoration: 'none', color: 'inherit',
                transition: 'border-color 0.2s, transform 0.2s, box-shadow 0.2s',
              }}
              onMouseOver={e => {
                (e.currentTarget as HTMLElement).style.borderColor = `${color}55`;
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 40px rgba(0,0,0,0.35)';
              }}
              onMouseOut={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
                (e.currentTarget as HTMLElement).style.transform = 'none';
                (e.currentTarget as HTMLElement).style.boxShadow = 'none';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 10,
                  background: `${color}18`, border: `1px solid ${color}30`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color, flexShrink: 0,
                }}>
                  <Icon size={19} />
                </div>
                <h3 style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)' }}>
                  {tool.name}
                </h3>
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.65, flex: 1, marginBottom: 16 }}>
                {tool.description}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.75rem', color, fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                Open Tool <ChevronRight size={13} />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
