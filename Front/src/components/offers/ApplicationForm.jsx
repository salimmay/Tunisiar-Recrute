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
  const { id } = useParams();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    university: "",
    email: "",
    phoneNumber: "",
    resume: null,
    coverLetter: null,
    aboutYourself: "",
    internshipOfferId: id,
  });

  const navigate = useNavigate();
  console.log(id);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) {
          throw new Error("User data is not available");
        }
        // Fetch user data based on the logged-in user ID
        const response = await axios.get(
          `${API_URL}/users/user/${user.userId}`
        );
        // Set form data with user data
        setFormData((prevFormData) => ({
          ...prevFormData,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          email: response.data.email,
          userId: user.userId,
        }));
      } catch (error) {
        console.error("Error fetching user data:", error);
        // Redirect to the login page if user data is not available
        navigate("/login");
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log(formData);
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const handleSubmitApplication = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });

      const response = await fetch(`${API_URL}/applications/`, {
        method: "POST",
        body: formDataToSend,
      });
      const responseData = await response.json();
      console.log(responseData);
      if (!responseData.ok) {
        console.error("Response status:", responseData);
        console.error("Response data:", responseData);
        throw new Error("Application submission failed");
      }
      // Redirect to the quiz page
      navigate(`/Quiz/${id}`);
    } catch (error) {
      console.error("Error message:", error.message);
    }
  };

  return (
    <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
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
              <input
                type="tel"
                name="phoneNumber"
                id="phone-number"
                autoComplete="tel"
                required
                value={formData.phoneNumber}
                onChange={handleChange}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
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
                type="file"
                name="resume"
                id="resume"
                required
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="block w-full text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="coverLetter"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Cover Letter
            </label>
            <div className="mt-2.5">
              <input
                type="file"
                name="coverLetter"
                id="coverLetter"
                required
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="block w-full text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="aboutYourself"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              About Yourself
            </label>
            <div className="mt-2.5">
              <textarea
                name="aboutYourself"
                id="aboutYourself"
                value={formData.aboutYourself}
                onChange={handleChange}
                rows="4"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
              ></textarea>
            </div>
          </div>
        </div>
        <div className="mt-10">
          <Switch.Group as="div" className="flex gap-x-4">
            <div className="flex h-6 items-center">
              <Switch
                checked={agreed}
                onChange={setAgreed}
                className={classNames(
                  agreed ? "bg-red-600" : "bg-gray-200",
                  "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-0 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2"
                )}
              >
                <span
                  aria-hidden="true"
                  className={classNames(
                    agreed ? "translate-x-5" : "translate-x-0",
                    "inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                  )}
                />
              </Switch>
            </div>
            <Switch.Label className="text-sm leading-6 text-gray-600">
              By selecting this, you agree to our{" "}
              <Link to="/terms" className="font-semibold text-red-600">
                terms and conditions
              </Link>
              .
            </Switch.Label>
          </Switch.Group>
        </div>
        <div className="mt-10">
          <button
            type="submit"
            disabled={!agreed}
            className={classNames(
              agreed
                ? "bg-red-600 hover:bg-red-500 focus-visible:outline-red-600"
                : "bg-gray-400 cursor-not-allowed",
              "block w-full rounded-md py-2 px-4 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            )}
          >
            Submit Application
          </button>
        </div>
      </form>
    </div>
  );
}
