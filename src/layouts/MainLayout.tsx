import React from 'react';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold text-primary">AMPRO License System</h1>
              </div>
              <nav className="ml-6 flex space-x-4">
                <a href="/" className="px-3 py-2 text-sm font-medium text-gray-900 hover:text-primary">
                  Dashboard
                </a>
                <a href="/citizens" className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-primary">
                  Citizens
                </a>
                <a href="/licenses" className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-primary">
                  Licenses
                </a>
                <a href="/applications" className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-primary">
                  Applications
                </a>
              </nav>
            </div>
            <div className="flex items-center">
              <button
                type="button"
                className="text-gray-500 hover:text-primary"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default MainLayout; 