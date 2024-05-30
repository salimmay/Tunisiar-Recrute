import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../../../../config";
import { useNavigate } from "react-router-dom";

function ManageInternshipOffer() {
  const [offersData, setOffersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOfferId, setSelectedOfferId] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOffersData = async () => {
      try {
        const accessToken = "user";
        const response = await axios.get(`${API_URL}/internshipOffers`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setOffersData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchOffersData();
  }, []);

  const handleDeleteOffer = (offerId) => {
    setSelectedOfferId(offerId);
    setShowConfirmation(true);
  };

  const handleConfirmOfferDeletion = async () => {
    try {
      const accessToken = "user";
      await axios.delete(`${API_URL}/internshipOffers/${selectedOfferId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Filter out the deleted offer from the local state
      setOffersData((prevOffersData) =>
        prevOffersData.filter((offer) => offer._id !== selectedOfferId)
      );
      setShowConfirmation(false);
    } catch (error) {
      setError(error);
    }
  };

  const handleCancelOfferDeletion = () => {
    setShowConfirmation(false);
  };

  const handleAddOffer = () => {
    navigate("/profile/AddInternshipOffer");
  };

  const handleModifyOffer = (offerId) => {
    navigate(`/profile/ModifyOffer/${offerId}`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (offersData.length === 0) return <div>No internship offers found</div>;

  return (
    <>
      <button
        onClick={handleAddOffer}
        className="absolute top-40 right-20 bg-red-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
      >
        Add Offer
      </button>
      <div className="border-gray-200">
        <dl className="divide-y divide-gray-200">
          {offersData.map((offer) => (
            <div
              key={offer._id}
              className="py-4 sm:py-7 sm:grid sm:grid-cols-3 sm:gap-4"
            >
              <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <span className="flex-grow">{offer.title}</span>
                <span className="flex items-center">
                  <button
                    onClick={() => handleModifyOffer(offer._id)}
                    className="mr-4 bg-gray-600 p-3 text-white px-4 py-2 rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                  >
                    Modify
                  </button>
                  <button
                    onClick={() => handleDeleteOffer(offer._id)}
                    className="bg-red-600 p-3 text-white px-4 py-2 rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
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
            <p>Are you sure you want to delete this offer?</p>
            <div className="confirmation-buttons">
              <button
                onClick={handleConfirmOfferDeletion}
                className="bg-red-600 p-3 text-white px-4 py-2 rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Yes
              </button>
              <button
                onClick={handleCancelOfferDeletion}
                className="bg-gray-300 p-3 ml-5 text-gray-700 px-4 py-2 rounded-md shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
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

export default ManageInternshipOffer;