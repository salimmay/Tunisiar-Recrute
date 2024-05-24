import React, { useState, useEffect } from 'react';
import axios from "axios";
import { API_URL } from "../../../../config";

function Applications({ internId }) {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get(`${API_URL}/applications?user=${internId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setApplications(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [internId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
      <h3 className="text-lg leading-6 font-medium text-gray-900">Interns applied</h3>
      <div className="mt-4">
        {applications.length === 0 ? (
          <p>No applications found.</p>
        ) : (
          <ul>
            {applications.map((application) => (
              <li key={application.id} className="mb-2">
                <div className="p-4 border rounded-lg shadow-sm">
                  <h4 className="text-md font-semibold">{application.title}</h4>
                  <p className="text-sm text-gray-500">{application.department}</p>
                  <p className="text-sm text-gray-500">Status: {application.status}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Applications;
