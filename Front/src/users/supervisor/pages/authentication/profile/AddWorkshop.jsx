import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../../../../config';

function AddWorkshop() {
  const [workshop, setWorkshop] = useState({
    title: '',
    description: '',
    date: '',
    meetLink: '',
    attendees: []
  });
  const [supervisedUsers, setSupervisedUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSupervisedUsers = async () => {
      try {
        const response = await axios.get(`${API_URL}/applications?supervisionStatus==approved`);
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
      await axios.post(`${API_URL}/workshops`, workshop);
      navigate('/profile/SupervisorWorkshops');
    } catch (error) {
      console.error('Error creating workshop:', error);
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create New Workshop</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block font-semibold">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={workshop.title}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block font-semibold">Description</label>
          <textarea
            id="description"
            name="description"
            value={workshop.description}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="date" className="block font-semibold">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={workshop.date}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="meetLink" className="block font-semibold">Meet Link</label>
          <input
            type="url"
            id="meetLink"
            name="meetLink"
            value={workshop.meetLink}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="attendees" className="block font-semibold">Attendees</label>
          <select
            id="attendees"
            name="attendees"
            multiple
            value={workshop.attendees}
            onChange={handleAttendeesChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
          >
            {supervisedUsers.map(user => (
              <option key={user._id} value={user._id}>
                {user.firstName} {user.lastName}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700">
          Create
        </button>
      </form>
    </div>
  );
}

export default AddWorkshop;
