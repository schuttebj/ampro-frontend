import React from 'react';
import { useParams } from 'react-router-dom';

const CitizenDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  return (
    <div className="min-h-screen bg-background p-8">
      <h1>Citizen Detail</h1>
      <p>Viewing citizen with ID: {id}</p>
      <p>This page is under construction.</p>
    </div>
  );
};

export default CitizenDetail; 