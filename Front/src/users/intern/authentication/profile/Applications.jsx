import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../../../config";

function Applications() {
  const [applications, setApplications] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);
  const [internshipOfferId, setInternshipOfferId] = useState(null);
  const [internshipOfferdata, setInternshipOfferdata] = useState(null);

  useEffect(() => {
    const fetchUserId = async () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const user = JSON.parse(storedUser);
        setUserId(user.userId);
      }
    };
    fetchUserId();
  }, []);

  useEffect(() => {
    if (userId) {
      const fetchApplications = async () => {
        try {
          const response = await axios.get(`${API_URL}/applications/${userId}`);
          const data = response.data;
          setApplications(data);
          setLoading(false);
          setInternshipOfferId(data.internshipOfferId); // Update internshipOfferId from fetched data
        } catch (error) {
          setError(error);
          setLoading(false);
        }
      };

      fetchApplications();
    }
  }, [userId]);

  useEffect(() => {
    const fetchInternshipOfferdata = async () => {
      try {
        const response = await axios.get(`${API_URL}/internshipOffers/${internshipOfferId}`);
        setInternshipOfferdata(response.data);
      } catch (error) {
        setError(error);
      }
    };

    if (internshipOfferId) {
      fetchInternshipOfferdata();
    }
  }, [internshipOfferId]);

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
      <h3 className="text-lg leading-6 font-medium text-gray-900">
        Interns applied
      </h3>
      <div className="mt-4">
        {Object.keys(applications).length === 0 ? (
          loading ? (
            <p>Loading...</p>
          ) : (
            <p>No applications found.</p>
          )
        ) : (
          <ul>
            <li key={applications.id} className="mb-2">
              <div className="p-4 border rounded-lg shadow-sm">
                <h4 className="text-md font-semibold">
                  Offer: {internshipOfferdata ? internshipOfferdata.title : ''}
                </h4>
                <p className="text-sm text-gray-500">
                  Department: {internshipOfferdata ? internshipOfferdata.department : ''}
                </p>
                <p className="text-sm text-gray-500">
                  Application Status: {applications.status}
                </p>
                <p className="text-sm text-gray-500">
                  Supervision Status: {applications.supervisionStatus}{" "}
                </p>
              </div>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}

export default Applications;
