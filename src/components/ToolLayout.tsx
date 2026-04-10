import { Outlet, Link, useParams } from 'react-router-dom';

export function ToolLayout() {
  const { name } = useParams();

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="mb-6 border-b border-gray-200 pb-4">
        <Link to="/tools" className="text-sm text-blue-600 hover:text-blue-800 flex items-center mb-4">
          &larr; Back to Tools
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 capitalize text-left">
          {name ? name.replace('-', ' ') : 'Tool'}
        </h1>
        <p className="mt-1 text-sm text-gray-500 text-left">
          Use this tool to process your data efficiently.
        </p>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
