import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  // These would typically come from an API
  const stats = [
    { label: 'Pending Applications', value: 24, icon: 'document-clock', color: 'warning' },
    { label: 'Licenses Issued', value: 156, icon: 'document-check', color: 'success' },
    { label: 'Transactions Today', value: 34, icon: 'credit-card', color: 'primary' },
    { label: 'Citizens Registered', value: 189, icon: 'user-group', color: 'secondary' },
  ];

  // Recent activities would come from an API
  const recentActivities = [
    { id: 1, action: 'License Issued', citizen: 'John Doe', timestamp: '2 hours ago' },
    { id: 2, action: 'Application Approved', citizen: 'Jane Smith', timestamp: '3 hours ago' },
    { id: 3, action: 'New Citizen Registered', citizen: 'Michael Johnson', timestamp: '5 hours ago' },
    { id: 4, action: 'License Renewed', citizen: 'Sarah Williams', timestamp: '1 day ago' },
    { id: 5, action: 'Application Submitted', citizen: 'David Brown', timestamp: '1 day ago' },
  ];

  const renderIcon = (icon: string, color: string) => {
    // This is a placeholder. In a real app, you'd use a proper icon library
    return (
      <div className={`h-12 w-12 rounded-full bg-${color}/20 flex items-center justify-center text-${color}`}>
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-primary">AMPRO License System</h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Welcome, Admin</span>
            <button className="text-sm text-gray-600 hover:text-primary">Logout</button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Dashboard</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-start">
                  {renderIcon(stat.icon, stat.color)}
                  <div className="ml-4">
                    <p className="text-gray-600 text-sm">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4">Recent Activities</h3>
              <div className="divide-y">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="py-3">
                    <div className="flex justify-between">
                      <p className="font-medium">{activity.action}</p>
                      <span className="text-sm text-gray-500">{activity.timestamp}</span>
                    </div>
                    <p className="text-sm text-gray-600">{activity.citizen}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Link to="/citizens/new" className="btn btn-primary w-full flex items-center justify-center">
                  New Citizen
                </Link>
                <Link to="/applications/new" className="btn btn-secondary w-full flex items-center justify-center">
                  New Application
                </Link>
                <Link to="/licenses/new" className="btn btn-success w-full flex items-center justify-center">
                  Issue License
                </Link>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4">Your Tasks</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="h-2 w-2 bg-warning rounded-full mr-2"></span>
                  <span>Review 5 pending applications</span>
                </li>
                <li className="flex items-center">
                  <span className="h-2 w-2 bg-primary rounded-full mr-2"></span>
                  <span>Print 3 approved licenses</span>
                </li>
                <li className="flex items-center">
                  <span className="h-2 w-2 bg-success rounded-full mr-2"></span>
                  <span>Verify 2 citizen documents</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard; 