import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../../../../config';
import { useNavigate, useParams } from 'react-router-dom';

function ModifyOffer() {
  const [offerData, setOfferData] = useState({
    title: '',
    description: '',
    department: '',
    location: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const offerId = useParams().id;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOfferData = async () => {
      try {
        const accessToken = 'user';
        const response = await axios.get(`${API_URL}/internshipOffers/${offerId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        setOfferData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchOfferData();
  }, [offerId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOfferData({
      ...offerData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const accessToken = 'user';
      await axios.put(`${API_URL}/internshipOffers/${offerId}`, offerData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      navigate('/profile/ManageInternshipOffer'); 
    } catch (error) {
      setError(error);
    }
  };

  const handleModifyQuiz = () => {
    navigate(`/profile/ModifyQuiz/${offerId}`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Modify Internship Offer</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={offerData.title}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={offerData.description}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="company">
          department
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={offerData.department}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={offerData.location}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={handleModifyQuiz}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Modify Quiz
          </button>
        </div>
      </form>
    </div>
  );
}

export default ModifyOffer;
