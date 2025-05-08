import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <p className="text-2xl text-gray-600 mt-2">Page not found</p>
      <p className="text-gray-500 mt-4">The page you're looking for doesn't exist or has been moved.</p>
      <Link to="/" className="mt-8 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors">
        Go back to Dashboard
      </Link>
    </div>
  );
};

export default NotFound; 