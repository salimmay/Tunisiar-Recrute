import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../../../../config';

function AddWorkshop() {
  const [workshop, setWorkshop] = useState({
    title: '',
    description: '',
    date: '',
    meetLink: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setWorkshop({
      ...workshop,
      [e.target.name]: e.target.value
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
        <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700">
          Create
        </button>
      </form>
    </div>
  );
}

export default AddWorkshop;
