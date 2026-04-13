import { TOOLS } from '../config/tools';
import { ArrowLeft } from 'lucide-react';
import { ROUTES } from '../config/routes';
import { Outlet, Link, useParams, useLocation } from 'react-router-dom';

export function ToolLayout() {
  const { name } = useParams();
  const location = useLocation();
  const pathName = name || location.pathname.split('/').filter(Boolean).pop();

  const currentTool = TOOLS.find(t => t.href.endsWith(pathName || ''));
  const Icon = currentTool?.icon;

  const title = currentTool ? currentTool.name : (pathName ? pathName.replace(/-/g, ' ') : 'Tool');
  const description = currentTool ? currentTool.description : 'Use this tool to process your data efficiently.';

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '28px 24px' }}>
      <Link
        to={ROUTES.TOOLS}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          fontSize: '0.8rem', fontWeight: 500, color: 'var(--text-muted)',
          textDecoration: 'none', marginBottom: 20,
          transition: 'color 0.15s',
        }}
        onMouseOver={e => (e.currentTarget.style.color = 'var(--text-primary)')}
        onMouseOut={e => (e.currentTarget.style.color = 'var(--text-muted)')}
      >
        <ArrowLeft size={14} />
        Back to Tools
      </Link>

      <div style={{
        display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 28,
        paddingBottom: 24, borderBottom: '1px solid var(--border)',
      }}>
        {Icon && (
          <div style={{
            width: 46, height: 46, borderRadius: 12, flexShrink: 0,
            background: 'var(--bg-elevated)', border: '1px solid var(--border)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#3b82f6',
          }}>
            <Icon size={22} />
          </div>
        )}
        <div>
          <h1 style={{ fontSize: '1.35rem', fontWeight: 800, letterSpacing: '-0.03em', textTransform: 'capitalize', color: 'var(--text-primary)', marginBottom: 4 }}>
            {title}
          </h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            {description}
          </p>
        </div>
      </div>

      <Outlet />
    </div>
  );
}
