import { Link } from 'react-router-dom';
import { TOOLS } from '../config/tools';
import { ChevronRight } from 'lucide-react';

export default function Tools() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Developer Tools</h1>
        <p className="mt-2 text-gray-600">
          A collection of powerful utilities for developers. Manipulate, validate, and generate data with ease.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {TOOLS.map((tool) => {
          const Icon = tool.icon;
          return (
            <Link
              key={tool.id}
              to={tool.href}
              className="group flex flex-col p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-blue-400 transition-all"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-lg bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {tool.name}
                </h3>
              </div>
              <p className="text-sm text-gray-500 flex-1 leading-relaxed">
                {tool.description}
              </p>
              <div className="mt-6 flex items-center text-sm font-medium text-blue-600">
                Open Tool
                <ChevronRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
