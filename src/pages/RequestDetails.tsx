import React from 'react';
import { useParams } from 'react-router-dom';

const RequestDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Fund Request Details - {id}
      </h1>
      <div className="card">
        <p className="text-gray-600">Request details will be displayed here.</p>
      </div>
    </div>
  );
};

export default RequestDetails;
