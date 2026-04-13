import { Outlet, Link, useParams, useLocation } from 'react-router-dom';
import { ROUTES } from '../config/routes';
import { TOOLS } from '../config/tools';
import { ArrowLeft } from 'lucide-react';

export function ToolLayout() {
  const { name } = useParams();
  const location = useLocation();
  const pathName = name || location.pathname.split('/').filter(Boolean).pop();

  const currentTool = TOOLS.find(t => t.href.endsWith(pathName || ''));
  
  const title = currentTool ? currentTool.name : (pathName ? pathName.replace('-', ' ') : 'Tool');
  const description = currentTool ? currentTool.description : 'Use this tool to process your data efficiently.';

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="mb-6 border-b border-gray-200 pb-4">
        <Link to={ROUTES.TOOLS} className="text-sm font-medium text-blue-600 hover:text-blue-800 inline-flex items-center gap-1.5 mb-4 group transition-colors">
          <ArrowLeft size={16} className="transform group-hover:-translate-x-1 transition-transform" />
          Back to Tools
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 capitalize text-left">
          {title}
        </h1>
        <p className="mt-1 text-sm text-gray-500 text-left">
          {description}
        </p>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
