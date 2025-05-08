import React from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../../layouts/MainLayout';

const CitizenList: React.FC = () => {
  // Placeholder data
  const citizens = [
    { id: '1', firstName: 'John', lastName: 'Doe', idNumber: 'ID12345678', dateOfBirth: '1985-05-15' },
    { id: '2', firstName: 'Jane', lastName: 'Smith', idNumber: 'ID87654321', dateOfBirth: '1990-10-20' },
    { id: '3', firstName: 'Robert', lastName: 'Johnson', idNumber: 'ID13579246', dateOfBirth: '1982-03-25' },
  ];

  return (
    <MainLayout>
      <div className="pb-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Citizens</h1>
          <button className="btn btn-primary">
            Add Citizen
          </button>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full table-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">ID Number</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Name</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Date of Birth</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {citizens.map((citizen) => (
                <tr key={citizen.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm">{citizen.idNumber}</td>
                  <td className="px-4 py-3 text-sm">{citizen.firstName} {citizen.lastName}</td>
                  <td className="px-4 py-3 text-sm">{citizen.dateOfBirth}</td>
                  <td className="px-4 py-3 text-sm">
                    <Link 
                      to={`/citizens/${citizen.id}`}
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
      </div>
    </MainLayout>
  );
};

export default CitizenList; 