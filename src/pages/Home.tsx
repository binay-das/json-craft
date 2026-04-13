import { Link } from 'react-router-dom';
import { ROUTES } from '../config/routes';
import { TOOLS } from '../config/tools';
import { ArrowRight, Zap, Shield, Code } from 'lucide-react';

export default function Home() {
  const featuredTools = TOOLS.slice(0, 3);

  return (
    <div className="flex flex-col gap-20 pb-20">
      {/* Hero Section */}
      <section className="flex flex-col items-center text-center gap-6 pt-12 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-medium">
          <Zap className="w-4 h-4" />
          <span>New tools added recently</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight">
          Craft perfect <span className="text-blue-600">JSON</span> data for your applications
        </h1>
        <p className="text-xl text-gray-500 max-w-2xl px-4">
          The ultimate swiss-army knife for modern developers. Format, validate, and generate data with lightning speed.
        </p>
        <div className="flex gap-4 mt-4">
          <Link
            to={ROUTES.TOOLS}
            className="px-8 py-3.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all flex items-center gap-2"
          >
            Browse All Tools
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
        <div className="flex flex-col gap-3">
          <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600 mb-2">
            <Zap className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold">Lightning Fast</h3>
          <p className="text-gray-500 text-sm leading-relaxed">
            All transformations happen in your browser. No data ever leaves your machine.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600 mb-2">
            <Shield className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold">Safe & Secure</h3>
          <p className="text-gray-500 text-sm leading-relaxed">
            Privacy-first toolset. Your sensitive data remains local and secure at all times.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-green-600 mb-2">
            <Code className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold">Developer First</h3>
          <p className="text-gray-500 text-sm leading-relaxed">
            Built by developers, for developers. Simple interfaces with powerful capabilities.
          </p>
        </div>
      </section>

      {/* Featured Tools Grid */}
      <section className="flex flex-col gap-8 px-4">
        <div className="flex justify-between items-end max-w-5xl mx-auto w-full">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Featured Utilities</h2>
            <p className="text-gray-500 mt-2">Tools our users love the most</p>
          </div>
          <Link to={ROUTES.TOOLS} className="text-blue-600 font-semibold hover:underline flex items-center gap-1">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto w-full">
          {featuredTools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link
                key={tool.id}
                to={tool.href}
                className="group p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                <div className="p-3 rounded-xl bg-gray-50 text-gray-600 group-hover:bg-blue-600 group-hover:text-white transition-colors w-fit mb-5">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">{tool.name}</h3>
                <p className="text-gray-500 text-sm line-clamp-2">{tool.description}</p>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
