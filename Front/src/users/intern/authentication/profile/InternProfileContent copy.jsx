import React, { useState, useEffect } from 'react';
import { useUser } from '../../../../components/contexts/AuthProvider';
import API from "../../../../service/api"

function InternProfileContent() {
  const [error, setError] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [confirmPassword, setConfirmPassword] = useState('');
  const user = useUser();

  useEffect(() => {
    const fetchProfileData = async () => {
      if (!user || !user.id) {
        setError(new Error('User data is not available'));
        return;
      }
  try {  
        const response = await API.get(`/users/user/${user.id}`);
        setProfileData(response.data);
        setFormData(response.data);
      } catch (error) {
        setError(error);
      }
    };

    fetchProfileData();
  }, [user]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = async () => {
    try {
      const response = await API.put(`/users/user/${user.id}`, {
        ...formData,
        confirmPassword,
      });
      setProfileData(response.data);
      setEditing(false);
      setConfirmPassword('');
    } catch (error) {
      setError(error);
    }
  };

  if (error) return <div>Error: {error.message}</div>;
  if (!profileData) return <div>Loading...</div>;

  return (
    <>
      <div>
        <h3 className="text-lg leading-6 font-medium text-gray-900">Applicant Information</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details and application.</p>
      </div>
      <div className="mt-5 border-t border-gray-200">
        {editing ? (
          <form className="space-y-4">
            <div>
              <label htmlFor="firstname" className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                name="firstname"
                id="firstname"
                value={formData.firstname}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                name="lastname"
                id="lastname"
                value={formData.lastname}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
              />
            </div>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={handleSave}
                className="bg-red-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div>
            <p>First Name: {profileData.firstname}</p>
            <p>Last Name: {profileData.lastname}</p>
            <p>Email: {profileData.email}</p>
            <button
              onClick={handleEdit}
              className="mt-4 bg-red-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Edit Profile
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default InternProfileContent;
