import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import MainLayout from '../../layouts/MainLayout';
import citizenService, { Citizen } from '../../api/citizenService';

const CitizenList: React.FC = () => {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  // Debounce search query
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchQuery]);

  // Fetch citizens data
  const {
    data: citizensData,
    isLoading,
    isError,
    error,
    refetch
  } = useQuery(
    ['citizens', page, debouncedQuery],
    () => debouncedQuery 
      ? citizenService.searchCitizens(debouncedQuery)
      : citizenService.getCitizens(page, 10),
    {
      keepPreviousData: true,
    }
  );

  // Determine if we have search results or paginated data
  const citizens = Array.isArray(citizensData) 
    ? citizensData 
    : citizensData?.data || [];
  
  const totalPages = Array.isArray(citizensData) 
    ? 1 
    : Math.ceil((citizensData?.total || 0) / 10);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setPage(1);
  };

  return (
    <MainLayout>
      <div className="pb-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Citizens</h1>
          <Link to="/citizens/new" className="btn btn-primary">
            New Citizen
          </Link>
        </div>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by ID number or name..."
            className="input w-full md:w-80"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>

        {isLoading ? (
          <div className="flex justify-center my-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : isError ? (
          <div className="bg-error/10 text-error p-4 rounded-md">
            Error loading citizens: {(error as any)?.message || 'Unknown error'}
          </div>
        ) : citizens.length === 0 ? (
          <div className="bg-gray-100 p-8 text-center rounded-md">
            <p className="text-gray-500">No citizens found</p>
            {debouncedQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="text-primary mt-2 hover:underline"
              >
                Clear search
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="w-full table-auto">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">ID Number</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Name</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Gender</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Phone</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {citizens.map((citizen: Citizen) => (
                    <tr key={citizen.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm">{citizen.id_number}</td>
                      <td className="px-4 py-3 text-sm">{citizen.first_name} {citizen.last_name}</td>
                      <td className="px-4 py-3 text-sm capitalize">{citizen.gender}</td>
                      <td className="px-4 py-3 text-sm">{citizen.phone_number}</td>
                      <td className="px-4 py-3 text-sm">
                        <Link 
                          to={`/citizens/${citizen.id}`}
                          className="text-primary hover:underline mr-4"
                        >
                          View
                        </Link>
                        <Link 
                          to={`/citizens/${citizen.id}/edit`}
                          className="text-secondary hover:underline"
                        >
                          Edit
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {!debouncedQuery && totalPages > 1 && (
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

export default CitizenList; 