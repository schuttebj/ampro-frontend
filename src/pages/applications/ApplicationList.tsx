import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import MainLayout from '../../layouts/MainLayout';
import applicationService, { LicenseApplication } from '../../api/applicationService';

const ApplicationList: React.FC = () => {
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState<string>('all'); // all, pending, approved, rejected

  // Fetch applications data based on filter
  const {
    data: applicationsData,
    isLoading,
    isError,
    error
  } = useQuery(
    ['applications', page, filter],
    () => filter === 'pending' 
      ? applicationService.getPendingApplications(page, 10)
      : applicationService.getApplications(page, 10),
    {
      keepPreviousData: true,
    }
  );

  const applications = applicationsData?.data || [];
  const totalPages = Math.ceil((applicationsData?.total || 0) / 10);

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'SUBMITTED':
        return 'bg-blue-100 text-blue-800';
      case 'UNDER_REVIEW':
        return 'bg-yellow-100 text-yellow-800';
      case 'DOCUMENTS_REQUESTED':
        return 'bg-purple-100 text-purple-800';
      case 'APPROVED':
        return 'bg-green-100 text-green-800';
      case 'REJECTED':
        return 'bg-red-100 text-red-800';
      case 'CANCELLED':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <MainLayout>
      <div className="pb-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">License Applications</h1>
          <Link to="/applications/new" className="btn btn-primary">
            New Application
          </Link>
        </div>

        <div className="mb-6">
          <div className="flex space-x-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-md ${filter === 'all' ? 'bg-primary text-white' : 'bg-gray-100'}`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`px-4 py-2 rounded-md ${filter === 'pending' ? 'bg-primary text-white' : 'bg-gray-100'}`}
            >
              Pending
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center my-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : isError ? (
          <div className="bg-error/10 text-error p-4 rounded-md">
            Error loading applications: {(error as any)?.message || 'Unknown error'}
          </div>
        ) : applications.length === 0 ? (
          <div className="bg-gray-100 p-8 text-center rounded-md">
            <p className="text-gray-500">No applications found</p>
            <Link 
              to="/applications/new"
              className="text-primary mt-2 block hover:underline"
            >
              Create new application
            </Link>
          </div>
        ) : (
          <>
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="w-full table-auto">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">ID</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Category</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Type</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Status</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Date</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {applications.map((application: LicenseApplication) => (
                    <tr key={application.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm">{application.id.slice(0, 8)}...</td>
                      <td className="px-4 py-3 text-sm">{application.category}</td>
                      <td className="px-4 py-3 text-sm">
                        {application.application_type === 'NEW' && 'New License'}
                        {application.application_type === 'RENEWAL' && 'Renewal'}
                        {application.application_type === 'REPLACEMENT' && 'Replacement'}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusClass(application.status)}`}>
                          {application.status.replace(/_/g, ' ')}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {new Date(application.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <Link 
                          to={`/applications/${application.id}`}
                          className="text-primary hover:underline mr-4"
                        >
                          View
                        </Link>
                        {(application.status === 'SUBMITTED' || application.status === 'UNDER_REVIEW') && (
                          <Link 
                            to={`/applications/${application.id}/process`}
                            className="text-secondary hover:underline"
                          >
                            Process
                          </Link>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-6">
                <div className="flex space-x-1">
                  <button
                    onClick={() => setPage((p: number) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className={`px-3 py-1 rounded-md ${
                      page === 1 
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Previous
                  </button>
                  
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => setPage(i + 1)}
                      className={`px-3 py-1 rounded-md ${
                        page === i + 1
                          ? 'bg-primary text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => setPage((p: number) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className={`px-3 py-1 rounded-md ${
                      page === totalPages
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </MainLayout>
  );
};

export default ApplicationList; 