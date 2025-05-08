import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import MainLayout from '../../layouts/MainLayout';
import applicationService from '../../api/applicationService';

const ApplicationDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  // Fetch application data
  const {
    data: application,
    isLoading,
    isError,
    error
  } = useQuery(
    ['application', id],
    () => applicationService.getApplication(id!),
    {
      enabled: !!id
    }
  );

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
  
  const renderApplicationStatus = () => {
    if (!application) return null;
    
    return (
      <div className="mb-8">
        <h2 className="text-xl font-medium mb-4">Application Status</h2>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center mb-4">
            <span className={`px-3 py-1 rounded-full text-sm ${getStatusClass(application.status)}`}>
              {application.status.replace(/_/g, ' ')}
            </span>
          </div>
          
          {application.status === 'SUBMITTED' && (
            <div className="mt-4 flex space-x-4">
              <button className="btn btn-secondary">Start Review</button>
            </div>
          )}
          
          {application.status === 'UNDER_REVIEW' && (
            <div className="mt-4 flex space-x-4">
              <button className="btn btn-primary">Approve</button>
              <button className="btn btn-error">Reject</button>
              <button className="btn btn-outline">Request Documents</button>
            </div>
          )}
        </div>
      </div>
    );
  };
  
  return (
    <MainLayout>
      <div className="pb-6">
        <div className="flex items-center mb-6">
          <Link to="/applications" className="text-primary hover:underline mr-4">
            &larr; Back to Applications
          </Link>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center my-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : isError ? (
          <div className="bg-error/10 text-error p-4 rounded-md">
            Error loading application: {(error as any)?.message || 'Unknown error'}
          </div>
        ) : application ? (
          <>
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-2xl font-bold">Application Details</h1>
                <p className="text-gray-600">ID: {application.id}</p>
                <p className="text-gray-600">Submitted: {new Date(application.created_at).toLocaleDateString()}</p>
              </div>
              
              {(application.status === 'SUBMITTED' || application.status === 'UNDER_REVIEW') && (
                <div>
                  <button className="btn btn-outline btn-sm">Cancel Application</button>
                </div>
              )}
            </div>
            
            {renderApplicationStatus()}
            
            <div className="mb-8">
              <h2 className="text-xl font-medium mb-4">License Information</h2>
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Category</p>
                    <p className="font-medium">{application.category}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Application Type</p>
                    <p className="font-medium">
                      {application.application_type === 'NEW' && 'New License'}
                      {application.application_type === 'RENEWAL' && 'License Renewal'}
                      {application.application_type === 'REPLACEMENT' && 'License Replacement'}
                    </p>
                  </div>
                </div>
                
                {application.notes && (
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-sm text-gray-600 mb-1">Notes</p>
                    <p>{application.notes}</p>
                  </div>
                )}
              </div>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-medium mb-4">Supporting Documents</h2>
              <div className="bg-white p-6 rounded-lg shadow">
                {application.supporting_documents && application.supporting_documents.length > 0 ? (
                  <ul className="divide-y">
                    {application.supporting_documents.map((doc, index) => (
                      <li key={index} className="py-3 flex justify-between items-center">
                        <div>
                          <p className="font-medium">Document {index + 1}</p>
                          <p className="text-sm text-gray-600">{doc}</p>
                        </div>
                        <button className="text-primary hover:underline">
                          View
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">No supporting documents attached</p>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="bg-yellow-100 p-4 rounded-md text-yellow-800">
            Application not found
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default ApplicationDetail; 