import React, { useState, useEffect } from "react";
import axios from "axios";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { Switch } from "@headlessui/react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../../config";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ApplicationForm() {
  const [agreed, setAgreed] = useState(false);
  const { offerId } = useParams();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    university: "",
    email: "",
    phoneNumber: "",
    resume: "",
    coverLetter: "",
    aboutYourself: "",
    internshipOfferId: offerId,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) {
          throw new Error("User data is not available");
        }
        // Fetch user data based on the logged-in user ID
        const response = await axios.get(`${API_URL}/users/user/${user.userId}`);
        // Set form data with user data
        setFormData({
          ...formData,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          email: response.data.email,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
        // Redirect to the login page if user data is not available
        navigate("/login");
      }
    };

    fetchUserData();
  }, [formData, navigate]); // Make sure to add formData and navigate to the dependency array

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmitApplication = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/applications/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();

      if (!response.ok) {
        console.error('Response status:', response.status);
        console.error('Response data:', responseData);
        throw new Error("Application submission failed");
      }
      // Redirect to the quiz page
      navigate(`/Quiz/${offerId}`);
    } catch (error) {
      console.error('Error message:', error.message);
    }
  };
  return (
    <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div
        className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
        aria-hidden="true"
      ></div>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Application Form
        </h2>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          Internship Offer Title
        </p>
      </div>
      <form
        onSubmit={handleSubmitApplication}
        className="mx-auto mt-16 max-w-xl sm:mt-20"
      >
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div>
            <label
              htmlFor="first-name"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              First name
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="firstName"
                id="first-name"
                autoComplete="given-name"
                required
                value={formData.firstName}
                onChange={handleChange}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="last-name"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Last name
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="lastName"
                id="last-name"
                autoComplete="family-name"
                required
                value={formData.lastName}
                onChange={handleChange}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="university"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              University
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="university"
                id="university"
                autoComplete="organization"
                required
                value={formData.university}
                onChange={handleChange}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Email
            </label>
            <div className="mt-2.5">
              <input
                type="email"
                name="email"
                id="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="phone-number"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Phone number
            </label>
            <div className="relative mt-2.5">
              <div className="absolute inset-y-0 left-0 flex items-center">
                <label htmlFor="country" className="sr-only">
                  Country code
                </label>
                <select
                  id="country"
                  name="country"
                  className="h-full rounded-md border-0 bg-transparent bg-none py-0 pl-4 pr-9 text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm"
                >
                  <option>TN</option>
                  <option>DA</option>
                  <option>EU</option>
                </select>
                <ChevronDownIcon
                  className="pointer-events-none absolute right-3 top-0 h-full w-5 text-gray-400"
                  aria-hidden="true"
                />
              </div>
              <input
                type="tel"
                name="phoneNumber"
                id="phone-number"
                autoComplete="tel"
                required
                value={formData.phoneNumber}
                onChange={handleChange}
                className="block w-full rounded-md border-0 px-3.5 py-2 pl-20 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="resume"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Resume
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="resume"
                id="resume"
                required
                onChange={handleChange}
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="cover-letter"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Cover Letter
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="coverLetter"
                id="cover-letter"
                onChange={handleChange}
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="about-yourself"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Tell us about yourself
            </label>
            <div className="mt-2.5">
              <textarea
                name="aboutYourself"
                id="about-yourself"
                rows="4"
                required
                value={formData.aboutYourself}
                onChange={handleChange}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
              ></textarea>
            </div>
          </div>
          <div className="flex gap-x-4 sm:col-span-2">
            <Switch
              checked={agreed}
              onChange={setAgreed}
              className={classNames(
                agreed ? "bg-red-600" : "bg-gray-200",
                "relative inline-flex flex-shrink-0 h-6 w-11 border-0 rounded-full cursor-pointer transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600"
              )}
            >
              <span
                aria-hidden="true"
                className={classNames(
                  agreed ? "translate-x-5" : "translate-x-0",
                  "inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition-transform duration-200 ease-in-out"
                )}
              />
            </Switch>
            <label className="text-sm leading-6 text-gray-600">
              By applying, you agree to our{" "}
              <Link to="#" className="font-semibold text-red-600">
                terms and conditions
              </Link>
              .
            </label>
          </div>
        </div>
        <div className="mt-10">
          <button
            type="submit"
            className="block w-full rounded-md bg-red-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
          >
            Apply
          </button>
        </div>
      </form>
    </div>
  );
}
