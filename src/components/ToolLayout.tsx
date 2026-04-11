import { Outlet, Link, useParams, useLocation } from 'react-router-dom';
import { ROUTES } from '../config/routes';

export function ToolLayout() {
  const { name } = useParams();
  const location = useLocation();
  const pathName = name || location.pathname.split('/').filter(Boolean).pop();

  let title = pathName ? pathName.replace('-', ' ') : 'Tool';
  let description = 'Use this tool to process your data efficiently.';

  // specific overrides
  if (pathName === 'json-formatter') {
    title = 'JSON Formatter';
    description = 'Format, validate, and beautify your JSON data instantly.';
  } 
  else if (pathName === 'csv-to-json') {
    title = 'CSV → JSON Converter';
    description = 'Convert structured CSV data into JSON format seamlessly.';
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="mb-6 border-b border-gray-200 pb-4">
        <Link to={ROUTES.TOOLS} className="text-sm text-blue-600 hover:text-blue-800 flex items-center mb-4">
          &larr; Back to Tools
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
