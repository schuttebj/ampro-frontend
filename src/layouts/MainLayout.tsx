import React, { ReactNode, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { user, logout, hasPermission } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navigationItems = [
    { name: 'Dashboard', path: '/', icon: 'home', roles: [] },
    { name: 'Citizens', path: '/citizens', icon: 'user', roles: ['clerk'] },
    { name: 'Applications', path: '/applications', icon: 'document-text', roles: ['clerk'] },
    { name: 'Licenses', path: '/licenses', icon: 'identification', roles: ['clerk'] },
    { name: 'Transactions', path: '/transactions', icon: 'currency-dollar', roles: ['clerk'] },
    { name: 'Users', path: '/users', icon: 'users', roles: ['admin'] },
    { name: 'Audit Logs', path: '/audit', icon: 'clipboard-list', roles: ['admin'] },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-center h-16 border-b">
          <h1 className="text-xl font-bold text-primary">AMPRO</h1>
        </div>

        <nav className="mt-4">
          <ul>
            {navigationItems.map((item) => {
              // Check if user has permission to see this item
              if (item.roles.length > 0 && !item.roles.some(role => hasPermission(role))) {
                return null;
              }

              const isActive = location.pathname === item.path || 
                             (item.path !== '/' && location.pathname.startsWith(item.path));

              return (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className={`flex items-center px-4 py-3 text-sm ${
                      isActive
                        ? 'bg-primary/10 text-primary border-r-4 border-primary'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="mr-3">{/* Icon would go here */}</span>
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between h-16 px-4">
            <button
              className="text-gray-600 focus:outline-none lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <div className="flex items-center">
              <span className="text-sm text-gray-600 mr-4">
                {user?.name || 'User'} ({user?.role || 'Unknown'})
              </span>
              <button 
                className="text-sm text-gray-600 hover:text-primary"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4">{children}</main>
      </div>
    </div>
  );
};

export default MainLayout; 