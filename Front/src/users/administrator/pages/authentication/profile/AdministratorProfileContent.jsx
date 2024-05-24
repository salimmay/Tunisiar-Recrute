import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../../../../config";
import { useNavigate } from "react-router-dom";

function AdministratorProfileContent() {
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const accessToken = "YOUR_ACCESS_TOKEN";
        const response = await axios.get(`${API_URL}/users`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        setUsersData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchUsersData();
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      setSelectedUserId(userId);
      setShowConfirmation(true);
    } catch (error) {
      setError(error);
    }
  };

  const handleConfirmUserDeletion = async () => {
    try {
      const accessToken = "YOUR_ACCESS_TOKEN";
      await axios.delete(`${API_URL}/users/user${selectedUserId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Filter out the deleted user from the local state
      setUsersData((prevUsersData) =>
        prevUsersData.filter((user) => user._id !== selectedUserId)
      );
      setShowConfirmation(false);
    } catch (error) {
      setError(error);
    }
  };

  const handleCancelUserDeletion = () => {
    setShowConfirmation(false);
  };

  const handleAddUser = () => {
    navigate("/profile/AddUser");
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (usersData.length === 0) return <div>No users found</div>;

  return (
    <>
      <button
        onClick={handleAddUser}
        className="absolute top-40 right-20 bg-red-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
      > Add User
      </button>
      <div className="border-gray-200">
        <dl className="divide-y divide-gray-200">
          {usersData.map((user) => (
            <div
              key={user._id}
              className="py-4 sm:py-7 sm:grid sm:grid-cols-3 sm:gap-4"
            >
              <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <span className="flex-grow">{user.firstname} {user.lastname}</span>
                <span className="flex-grow"> {user.role}</span>
                <span className="flex items-center">
                  <button
                    onClick={() => handleDeleteUser(user._id)}
                    className="absolute right-60 bg-gray-600 p-3 text-white px-4 py-2 rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
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
            <p>Are you sure you want to delete the user?</p>
            <div className="confirmation-buttons">
              <button
                onClick={handleConfirmUserDeletion}
                className="bg-red-600 p-3 text-white px-4 py-2 rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Yes
              </button>
              <button
                onClick={handleCancelUserDeletion}
                className="bg-gray-300 p-3 ml-5  text-gray-700 px-4 py-2 rounded-md shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
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

export default AdministratorProfileContent;
