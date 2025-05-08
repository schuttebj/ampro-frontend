import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import MainLayout from '../layouts/MainLayout';
import { useAuth } from '../contexts/AuthContext';
import applicationService from '../api/applicationService';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  
  // Fetch pending applications
  const { data: pendingApplicationsData } = useQuery(
    'pendingApplications',
    () => applicationService.getPendingApplications(1, 5),
    {
      staleTime: 60000
    }
  );
  
  const pendingApplications = pendingApplicationsData?.data || [];
  
  // These would typically come from an API
  const stats = [
    { label: 'Pending Applications', value: pendingApplicationsData?.total || 0, icon: 'document-clock', color: 'warning' },
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

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'SUBMITTED':
        return 'bg-blue-100 text-blue-800';
      case 'UNDER_REVIEW':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <MainLayout>
      <div>
        <h2 className="text-xl font-bold mb-4">Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Pending Applications</h3>
                <Link to="/applications?filter=pending" className="text-primary text-sm hover:underline">
                  View all
                </Link>
              </div>
              
              {pendingApplications.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-3 py-2 text-left">ID</th>
                        <th className="px-3 py-2 text-left">Category</th>
                        <th className="px-3 py-2 text-left">Type</th>
                        <th className="px-3 py-2 text-left">Status</th>
                        <th className="px-3 py-2 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {pendingApplications.map((app) => (
                        <tr key={app.id} className="hover:bg-gray-50">
                          <td className="px-3 py-2">{app.id.slice(0, 8)}...</td>
                          <td className="px-3 py-2">{app.category}</td>
                          <td className="px-3 py-2">
                            {app.application_type === 'NEW' && 'New'}
                            {app.application_type === 'RENEWAL' && 'Renewal'}
                            {app.application_type === 'REPLACEMENT' && 'Replacement'}
                          </td>
                          <td className="px-3 py-2">
                            <span className={`px-2 py-1 rounded-full text-xs ${getStatusClass(app.status)}`}>
                              {app.status.replace(/_/g, ' ')}
                            </span>
                          </td>
                          <td className="px-3 py-2">
                            <Link 
                              to={`/applications/${app.id}`}
                              className="text-primary hover:underline"
                            >
                              View
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">No pending applications</p>
              )}
            </div>
            
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
                  <span>Review {pendingApplicationsData?.total || 0} pending applications</span>
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
      </div>
    </MainLayout>
  );
};

export default Dashboard; 