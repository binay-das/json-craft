import { Outlet, Link, NavLink } from 'react-router-dom';
import { ROUTES } from '../config/routes';

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link to={ROUTES.HOME} className="text-xl font-bold text-blue-600">
                  JSONCraft
                </Link>
              </div>
              <div className="ml-6 flex space-x-8">
                <NavLink 
                  to={ROUTES.HOME} 
                  end
                  className={({ isActive }) => 
                    `inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors ${
                      isActive 
                        ? 'border-blue-500 text-gray-900' 
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    }`
                  }
                >
                  Home
                </NavLink>
                <NavLink 
                  to={ROUTES.TOOLS} 
                  className={({ isActive }) => 
                    `inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors ${
                      isActive 
                        ? 'border-blue-500 text-gray-900' 
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    }`
                  }
                >
                  Tools
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </header>
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
}
