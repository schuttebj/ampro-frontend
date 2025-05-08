import React from 'react';
import MainLayout from '../layouts/MainLayout';

const Dashboard: React.FC = () => {
  return (
    <MainLayout>
      <div>
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <div className="bg-white shadow rounded-lg p-6">
          <p>Welcome to the AMPRO License System Dashboard</p>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard; 