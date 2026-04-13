import { useState } from 'react';
import { TOOLS } from '../config/tools';
import { ROUTES } from '../config/routes';
import { Outlet, Link, NavLink } from 'react-router-dom';
import { ChevronDown, Menu, X, Braces } from 'lucide-react';

export function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isToolsDropdownOpen, setIsToolsDropdownOpen] = useState<boolean>(false);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-base)', color: 'var(--text-primary)' }}>
      <header style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: 'rgba(11,13,17,0.85)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border)',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 60 }}>
          <Link to={ROUTES.HOME} style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none', color: 'inherit' }}>
            <div style={{
              width: 32, height: 32, borderRadius: 8,
              background: 'linear-gradient(135deg, #3b82f6, #22d3a5)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Braces size={18} color="#fff" />
            </div>
            <span style={{ fontWeight: 700, fontSize: '1.05rem', letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
              JSON<span style={{ color: '#3b82f6' }}>Craft</span>
            </span>
          </Link>

          <nav style={{ display: 'flex', alignItems: 'center', gap: 4 }} className="hidden-mobile">
            <div style={{ position: 'relative' }}
              onMouseLeave={() => setIsToolsDropdownOpen(false)}
            >
              <button
                onMouseEnter={() => setIsToolsDropdownOpen(true)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 4,
                  padding: '6px 12px', borderRadius: 6, border: 'none',
                  background: 'transparent', color: 'var(--text-secondary)',
                  fontSize: '0.875rem', fontWeight: 500, cursor: 'pointer',
                  transition: 'color 0.15s',
                }}
                onMouseOver={e => (e.currentTarget.style.color = 'var(--text-primary)')}
                onMouseOut={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
              >
                Tools
                <ChevronDown size={13} style={{ transform: isToolsDropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }} />
              </button>

              {isToolsDropdownOpen && (
                <div style={{
                  position: 'absolute', top: '100%', left: 0, minWidth: 300, marginTop: 4,
                  background: 'var(--bg-elevated)', border: '1px solid var(--border)',
                  borderRadius: 12, boxShadow: '0 24px 64px rgba(0,0,0,0.6)',
                  overflow: 'hidden', animation: 'fadeInUp 0.15s ease-out',
                }}>
                  <div style={{ padding: 8 }}>
                    {TOOLS.map((tool) => {
                      const Icon = tool.icon;
                      return (
                        <Link
                          key={tool.id}
                          to={tool.href}
                          onClick={() => setIsToolsDropdownOpen(false)}
                          style={{
                            display: 'flex', alignItems: 'center', gap: 10,
                            padding: '10px 12px', borderRadius: 8, textDecoration: 'none',
                            color: 'var(--text-primary)', transition: 'background 0.15s',
                          }}
                          onMouseOver={e => (e.currentTarget.style.background = 'var(--bg-card)')}
                          onMouseOut={e => (e.currentTarget.style.background = 'transparent')}
                        >
                          <div style={{
                            width: 32, height: 32, borderRadius: 8,
                            background: 'var(--bg-card)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: '#3b82f6', flexShrink: 0,
                          }}>
                            <Icon size={16} />
                          </div>
                          <div>
                            <div style={{ fontSize: '0.825rem', fontWeight: 600 }}>{tool.name}</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.3 }}>{tool.description}</div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                  <Link
                    to={ROUTES.TOOLS}
                    onClick={() => setIsToolsDropdownOpen(false)}
                    style={{
                      display: 'block', padding: '10px 20px', textAlign: 'center',
                      fontSize: '0.75rem', fontWeight: 600, color: '#3b82f6',
                      textDecoration: 'none', borderTop: '1px solid var(--border)',
                      background: 'var(--bg-surface)', letterSpacing: '0.05em',
                      textTransform: 'uppercase',
                    }}
                  >
                    All Tools →
                  </Link>
                </div>
              )}
            </div>

            {[
              { label: 'Converters', to: ROUTES.TOOLS },
              { label: 'Validators', to: ROUTES.TOOLS },
              { label: 'Docs', to: ROUTES.DOCS }
            ].map(item => (
              <NavLink
                key={item.label}
                to={item.to}
                style={({ isActive }) => ({
                  padding: '6px 12px', borderRadius: 6, textDecoration: 'none',
                  fontSize: '0.875rem', fontWeight: 500,
                  color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                  transition: 'color 0.15s',
                })}
                onMouseOver={e => (e.currentTarget.style.color = 'var(--text-primary)')}
                onMouseOut={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Link
              to={ROUTES.TOOLS}
              style={{
                padding: '7px 18px', borderRadius: 8, textDecoration: 'none',
                background: '#3b82f6', color: '#fff',
                fontSize: '0.825rem', fontWeight: 600,
                transition: 'opacity 0.15s, transform 0.15s',
              }}
              onMouseOver={e => { (e.currentTarget as HTMLElement).style.opacity = '0.85'; }}
              onMouseOut={e => { (e.currentTarget as HTMLElement).style.opacity = '1'; }}
            >
              Try it Free
            </Link>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              style={{
                display: 'none', padding: 6, border: 'none',
                background: 'transparent', color: 'var(--text-secondary)', cursor: 'pointer',
              }}
              className="show-mobile"
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div style={{
            background: 'var(--bg-elevated)', borderTop: '1px solid var(--border)',
            padding: '12px 24px 20px', animation: 'fadeInUp 0.2s ease-out',
          }}>
            <Link
              to={ROUTES.DOCS}
              onClick={() => setIsMenuOpen(false)}
              style={{
                display: 'block', padding: '8px 0', textDecoration: 'none',
                color: 'var(--text-secondary)', fontSize: '0.9rem', borderBottom: '1px solid var(--border)',
              }}
            >
              Documentation
            </Link>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8, marginTop: 12 }}>Tools</div>
            {TOOLS.map((tool) => (
              <Link
                key={tool.id}
                to={tool.href}
                onClick={() => setIsMenuOpen(false)}
                style={{
                  display: 'block', padding: '8px 0', textDecoration: 'none',
                  color: 'var(--text-secondary)', fontSize: '0.9rem', borderBottom: '1px solid var(--border)',
                }}
              >
                {tool.name}
              </Link>
            ))}
          </div>
        )}
      </header>

      <main style={{ flex: 1, width: '100%' }}>
        <Outlet />
      </main>

      <footer style={{
        borderTop: '1px solid var(--border)',
        background: 'var(--bg-surface)',
        padding: '40px 24px',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 32 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <div style={{
                width: 28, height: 28, borderRadius: 7,
                background: 'linear-gradient(135deg, #3b82f6, #22d3a5)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Braces size={15} color="#fff" />
              </div>
              <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>JSONCraft</span>
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', maxWidth: 220, lineHeight: 1.6 }}>
              © {new Date().getFullYear()} JSONCraft. The JSON architect's toolkit.
            </p>
          </div>

          {[
            { title: 'Documentation', links: [{ l: 'Getting Started', to: ROUTES.DOCS }, { l: 'API Reference', to: ROUTES.DOCS }, { l: 'Changelog', to: ROUTES.DOCS }] },
            { title: 'Tools', links: [{ l: 'JSON Formatter', to: '/tool/json-formatter' }, { l: 'CSV to JSON', to: '/tool/csv-to-json' }, { l: 'Schema Generator', to: '/tool/json-schema' }, { l: 'Mock Engine', to: '/tool/api-mock' }] },
            { title: 'Legal', links: [{ l: 'Privacy Policy', to: '/docs' }, { l: 'Terms of Service', to: '/docs' }] },
          ].map(group => (
            <div key={group.title}>
              <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>{group.title}</div>
              {group.links.map(link => (
                <Link key={link.l} to={link.to} style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-secondary)', textDecoration: 'none', marginBottom: 6, transition: 'color 0.15s' }}
                  onMouseOver={e => (e.currentTarget.style.color = 'var(--text-primary)')}
                  onMouseOut={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
                >{link.l}</Link>
              ))}
            </div>
          ))}
        </div>
      </footer>

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile   { display: flex !important; }
        }
      `}</style>
    </div>
  );
}
