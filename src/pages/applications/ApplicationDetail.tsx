import React from 'react';
import { useParams } from 'react-router-dom';

const ApplicationDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  return (
    <div className="min-h-screen bg-background p-8">
      <h1>Application Detail</h1>
      <p>Viewing application with ID: {id}</p>
      <p>This page is under construction.</p>
    </div>
  );
};

export default ApplicationDetail; 