import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../../../../../config";
import { useNavigate } from "react-router-dom";

function AddUser() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    role: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const accessToken = "YOUR_ACCESS_TOKEN";
      await axios.post(`${API_URL}/users/signup`, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      navigate("/profile/AdministratorProfileContent");
    } catch (error) {
      console.error("Error adding profile:", error);
    }
  };

  return (
    <div className="container mx-auto mt-5">
      <h2 className="text-lg font-semibold mb-3">Add User</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4 flex flex-col">
          <label htmlFor="firstname" className="mb-1">
            First Name:
          </label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-4 flex flex-col">
          <label htmlFor="lastname" className="mb-1">
            Last Name:
          </label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-4 flex flex-col">
          <label htmlFor="email" className="mb-1">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-4 flex flex-col">
          <label htmlFor="password" className="mb-1">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-4 flex flex-col">
          <label htmlFor="role" className="mb-1">
            Role:
          </label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-md p-2"
          >
            <option value="">Select Role</option>
            <option value="intern">Intern</option>
            <option value="supervisor">Supervisor</option>
            <option value="internship coordinator">Internship Coordinator</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-red-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Add Profile
        </button>
      </form>
    </div>
  );
}

export default AddUser;
