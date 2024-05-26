import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../../../config';
import WorkshopModal from './WorkshopModal';

function InternWorkshops() {
  const [workshops, setWorkshops] = useState([]);
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserId(user.userId);
    }
  }, []);

  useEffect(() => {
    const fetchWorkshops = async () => {
      try {
        if (!userId) {
          setError(new Error('User data is not available'));
          return;
        }

        const response = await axios.get(`${API_URL}/workshops?attendee=${userId}`);
        setWorkshops(response.data);
      } catch (error) {
        console.error('Error fetching workshops:', error);
        setError(error);
      }
    };

    if (userId) {
      fetchWorkshops();
    }
  }, [userId]);

  const handleWorkshopClick = (workshop) => {
    setSelectedWorkshop(workshop);
    setOpen(true);
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!workshops.length) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">My Workshops</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {workshops.map((workshop) => (
          <div
            key={workshop._id}
            className="p-4 border border-gray-200 rounded-md shadow-md hover:shadow-lg cursor-pointer"
            onClick={() => handleWorkshopClick(workshop)}
          >
            <h2 className="text-xl font-semibold mb-2">{workshop.title}</h2>
            <p className="text-gray-700 mb-2">{workshop.description}</p>
            <p className="text-gray-500">{new Date(workshop.date).toLocaleDateString()}</p>
            <p className="text-gray-500 mt-2">
              Meet Link: <a href={workshop.meetLink} className="text-blue-500" target="_blank" rel="noopener noreferrer">Join Meeting</a>
            </p>
          </div>
        ))}
      </div>
      {selectedWorkshop && (
        <WorkshopModal
          workshop={selectedWorkshop}
          open={open}
          setOpen={setOpen}
        />
      )}
    </div>
  );
}

export default InternWorkshops;
