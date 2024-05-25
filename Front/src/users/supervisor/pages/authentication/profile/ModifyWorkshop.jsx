import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { API_URL } from '../../../../../config';

function ModifyWorkshop() {
  const { id } = useParams();
  const [workshop, setWorkshop] = useState({
    title: '',
    description: '',
    date: '',
    meetLink: '',
    attendees: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [supervisedUsers, setSupervisedUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWorkshop = async () => {
      try {
        const response = await axios.get(`${API_URL}/workshops/${id}`);
        setWorkshop(response.data); // Set the workshop data from the response
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchWorkshop();
  }, [id]);

  useEffect(() => {
    const fetchSupervisedUsers = async () => {
      try {
        const response = await axios.get(`${API_URL}/applications?supervisionStatus=approved`); // Fixed typo in the URL
        setSupervisedUsers(response.data);
      } catch (error) {
        console.error('Error fetching supervised users:', error);
      }
    };

    fetchSupervisedUsers();
  }, []);

  const handleChange = (e) => {
    setWorkshop({
      ...workshop,
      [e.target.name]: e.target.value
    });
  };

  const handleAttendeesChange = (e) => {
    const selectedAttendees = Array.from(e.target.selectedOptions, (option) => option.value);
    setWorkshop({
      ...workshop,
      attendees: selectedAttendees
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_URL}/workshops/${id}`, workshop);
      navigate('/profile/workshops');
    } catch (error) {
      setError(error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Modify Workshop</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={workshop.title}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={workshop.description}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="date" className="block text-gray-700 text-sm font-bold mb-2">
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={workshop.date}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="meetLink" className="block text-gray-700 text-sm font-bold mb-2">
            Meet Link
          </label>
          <input
            type="url"
            id="meetLink"
            name="meetLink"
            value={workshop.meetLink}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="attendees" className="block text-gray-700 text-sm font-bold mb-2">
            Attendees
          </label>
          <select
            id="attendees"
            name="attendees"
            multiple
            value={workshop.attendees}
            onChange={handleAttendeesChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          >
            {supervisedUsers.map(user => (
              <option key={user._id} value={user._id}>
                {user.firstName} {user.lastName}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
export default ModifyWorkshop;
