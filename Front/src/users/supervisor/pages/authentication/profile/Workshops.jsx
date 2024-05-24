import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../../../../config';

function SupervisorWorkshops() {
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedWorkshopId, setSelectedWorkshopId] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWorkshops = async () => {
      try {
        const response = await axios.get(`${API_URL}/workshops`);
        setWorkshops(Array.isArray(response.data.data) ? response.data.data : []);
        setLoading(false);
        console.log(response.data)
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchWorkshops();
  }, []);

  const handleDeleteWorkshop = async (workshopId) => {
    setSelectedWorkshopId(workshopId);
    setShowConfirmation(true);
  };

  const handleConfirmWorkshopDeletion = async () => {
    try {
      await axios.delete(`${API_URL}/workshops/${selectedWorkshopId}`);
      setWorkshops(workshops.filter(workshop => workshop._id !== selectedWorkshopId));
      setShowConfirmation(false);
    } catch (error) {
      setError(error);
    }
  };

  const handleCancelWorkshopDeletion = () => {
    setShowConfirmation(false);
  };

  const handleAddWorkshop = () => {
    navigate("/profile/Workshops/AddWorkshop");
  };

  const handleModifyWorkshop = (workshopId) => {
    navigate(`/profile/Workshops/ModifyWorkshop/${workshopId}`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (workshops.length === 0) return <div>No workshops found</div>;

  return (
    <>
      <button
        onClick={handleAddWorkshop}
        className="absolute top-40 right-20 bg-red-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
      >
        Add Workshop
      </button>
      <div className="border-gray-200">
        <dl className="divide-y divide-gray-200">
          {workshops.map(workshop => (
            <div key={workshop._id} className="py-4 sm:py-7 sm:grid sm:grid-cols-3 sm:gap-4">
              <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <span className="flex-grow">
                  <div>{workshop.title}</div>
                  <div>{workshop.description}</div>
                  <div>{new Date(workshop.date).toLocaleDateString()}</div>
                  <div>
                    <a href={workshop.meetLink} target="_blank" rel="noopener noreferrer">
                      {workshop.meetLink}
                    </a>
                  </div>
                </span>
                <span className="flex items-center">
                  <button
                    onClick={() => handleModifyWorkshop(workshop._id)}
                    className="mr-4 bg-gray-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                  >
                    Modify
                  </button>
                  <button
                    onClick={() => handleDeleteWorkshop(workshop._id)}
                    className="bg-red-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Delete
                  </button>
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {showConfirmation && (
        <div className="confirmation mt-4">
          <div className="text-right confirmation-content">
            <p>Are you sure you want to delete this workshop?</p>
            <div className="confirmation-buttons">
              <button
                onClick={handleConfirmWorkshopDeletion}
                className="bg-red-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Yes
              </button>
              <button
                onClick={handleCancelWorkshopDeletion}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SupervisorWorkshops;
