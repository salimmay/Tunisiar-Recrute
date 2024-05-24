import React, { useState } from 'react';

function InternshipCoordinatorProfileContent() {
  const [error, setError] = useState(null);
  const [profileData, setProfileData] = useState({
    firstname: 'John',
    lastname: 'Doe',
    email: 'john.doe@example.com'
  });
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState(profileData);
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = async () => {
    // Simulate saving the data
    console.log("Saving data:", formData, confirmPassword);
    setProfileData(formData);
    setEditing(false);
    setConfirmPassword('');
  };

  if (error) return <div>Error: {error.message}</div>;

  const profileView = (
    <div>
      <b>First Name:</b> 
      <p>  {profileData.firstname}</p>
      <b> Last Name: </b>
      <p>{profileData.lastname}</p>
      <b>Email:</b> 
      <p>{profileData.email}</p>
      <button
        onClick={handleEdit}
        className="mt-4 bg-red-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
      >
        Edit Profile
      </button>
    </div>
  );

  const profileEditForm = (
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
  );

  return (
    <>
        {editing ? profileEditForm : profileView}
    </>
  );
}

export default InternshipCoordinatorProfileContent;
