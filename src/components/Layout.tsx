import { useState } from 'react';
import { Outlet, Link, NavLink } from 'react-router-dom';
import { ROUTES } from '../config/routes';
import { TOOLS } from '../config/tools';
import { ChevronDown, Menu, X, Terminal } from 'lucide-react';

export function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isToolsDropdownOpen, setIsToolsDropdownOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-10">
              <Link to={ROUTES.HOME} className="flex items-center gap-2 text-xl font-bold text-gray-900 overflow-hidden group">
                <div className="p-1.5 bg-blue-600 rounded text-white group-hover:rotate-12 transition-transform">
                  <Terminal size={18} />
                </div>
                <span>JSONCraft</span>
              </Link>
              
              <nav className="hidden md:flex space-x-1 lg:space-x-4">
                <NavLink 
                  to={ROUTES.HOME} 
                  end
                  className={({ isActive }) => 
                    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                    }`
                  }
                >
                  Home
                </NavLink>
                
                <div className="relative">
                  <button
                    onMouseEnter={() => setIsToolsDropdownOpen(true)}
                    className="flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors"
                  >
                    Tools
                    <ChevronDown size={14} className={`transform transition-transform ${isToolsDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Desktop Dropdown */}
                  {isToolsDropdownOpen && (
                    <div 
                      onMouseLeave={() => setIsToolsDropdownOpen(false)}
                      className="absolute top-full left-0 w-80 mt-1 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden animate-[fadeInUp_0.2s_ease-out]"
                    >
                      <div className="p-2 grid grid-cols-1 divide-y divide-gray-50">
                        {TOOLS.map((tool) => {
                          const Icon = tool.icon;
                          return (
                            <Link
                              key={tool.id}
                              to={tool.href}
                              onClick={() => setIsToolsDropdownOpen(false)}
                              className="group flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 transition-colors"
                            >
                              <div className="p-2 rounded-lg bg-gray-50 text-gray-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                <Icon size={18} />
                              </div>
                              <div>
                                <div className="text-sm font-semibold text-gray-900">{tool.name}</div>
                                <div className="text-xs text-gray-500 line-clamp-1">{tool.description}</div>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                      <Link 
                        to={ROUTES.TOOLS}
                        className="block py-3 px-4 bg-gray-50 text-center text-xs font-bold text-blue-600 hover:bg-gray-100 uppercase tracking-widest border-t border-gray-100"
                        onClick={() => setIsToolsDropdownOpen(false)}
                      >
                        All Tools Dashboard
                      </Link>
                    </div>
                  )}
                </div>
              </nav>
            </div>

            {/* Mobile menu button */}
            <div className="flex md:hidden items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 animate-in slide-in-from-top duration-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to={ROUTES.HOME}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <div className="px-3 py-2 text-xs font-bold text-gray-400 uppercase tracking-widest">Tools</div>
              {TOOLS.map((tool) => (
                <Link
                  key={tool.id}
                  to={tool.href}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 pl-6"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {tool.name}
                </Link>
              ))}
              <Link
                to={ROUTES.TOOLS}
                className="block px-3 py-2 rounded-md text-base font-bold text-blue-600 hover:bg-blue-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Full Dashboard
              </Link>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <Outlet />
      </main>

      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} JSONCraft. All manipulations are local-only.</p>
        </div>
      </footer>
    </div>
  );
}
