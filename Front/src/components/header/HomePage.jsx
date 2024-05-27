import React, { useState, useEffect } from "react";
import OfferItemSection from "../offers/OfferItemSection";
import { API_URL } from "../../config";
import { CheckIcon } from "@heroicons/react/outline";
import { Link } from "react-router-dom";

export default function HomePage() {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await fetch(`${API_URL}/internshipOffers`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setOffers(data);
      } catch (error) {
        console.error("Error fetching offers:", error);
      }
    };

    fetchOffers();
  }, []);

  const features = [
    {
      name: "Sign In",
      description:
        "Create an account or sign in to access personalized internship offers and apply easily.",
    },
    {
      name: "Choose Your Internship",
      description:
        "Browse through a wide variety of internship opportunities available at Tunisair.",
    },
    {
      name: "Fill the Application Form",
      description:
        "Complete the application form with your details and submit your resume and cover letter.",
    },
  ];

  return (
    <>
      <main>
        <section>
          <div className="relative bg-white pt-20">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
              <div className="relative shadow-xl sm:rounded-2xl sm:overflow-hidden">
                <div className="absolute inset-0">
                  <img
                    className="h-full w-full object-cover"
                    src="https://images.unsplash.com/photo-1488085061387-422e29b40080?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="People working on laptops"
                  />
                  <div className="absolute inset-0 bg-red-700 mix-blend-multiply" />
                </div>
                <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
                  <h1 className="text-center text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                    <span className="block text-white">
                      Reimagine Your Career
                    </span>
                    <span className="block text-red-200 pt-4">
                      with Tunisair
                    </span>
                  </h1>
                  <p className="mt-6 max-w-lg mx-auto text-center text-xl text-red-200 sm:max-w-3xl">
                    Discover exciting internship opportunities at Tunisair that
                    will propel your career forward. Join our dynamic team and
                    gain invaluable experience in the aviation industry.
                  </p>
                  <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
                    <div className="space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5">
                      <Link
                        to="/carrers"
                        className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-red-700 bg-white hover:bg-indigo-50 sm:px-8"
                      >
                        Careers
                      </Link>
                      <Link
                        to="/contact"
                        className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-red-500 bg-opacity-60 hover:bg-opacity-70 sm:px-8"
                      >
                        Contact
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="bg-white">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-10 lg:px-8 lg:grid lg:grid-cols-3 lg:gap-x-5">
              <div>
                <h2 className="text-base font-semibold text-red-600 uppercase tracking-wide">
                  Everything you need
                </h2>
                <p className="mt-2 text-3xl font-extrabold text-gray-900">
                  To start your internship journey
                </p>
                <p className="mt-4 text-lg text-gray-500">
                  Follow these simple steps to find the perfect internship and
                  kickstart your career with Tunisair.
                </p>
              </div>
              <div className="mt-12 lg:mt-0 lg:col-span-2">
                <dl className="space-y-10 sm:space-y-0 sm:grid sm:grid-cols-2 sm:grid-rows-4 sm:grid-flow-col sm:gap-x-6 sm:gap-y-10 lg:gap-x-8">
                  {features.map((feature) => (
                    <div key={feature.name} className="relative">
                      <dt>
                        <CheckIcon
                          className="absolute h-6 w-6 text-green-500"
                          aria-hidden="true"
                        />
                        <p className="ml-9 text-lg leading-6 font-medium text-gray-900">
                          {feature.name}
                        </p>
                      </dt>
                      <dd className="mt-2 ml-9 text-base text-gray-500">
                        {feature.description}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </section>
        <section aria-labelledby="offers-heading" className="bg-white">
          <div className="py-16 sm:py-24 lg:max-w-7xl lg:mx-auto lg:py-32 lg:px-8">
            <h2
              id="offers-heading"
              className="text-2xl font-extrabold tracking-tight text-gray-900"
            >
              Latest offers
            </h2>
            <div className="mt-16 relative">
              <div className="relative w-full">
                <ul
                  role="list"
                  className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-4"
                >
                  {offers.map((offer) => (
                    <li key={offer._id} className="flex flex-col text-center">
                      <OfferItemSection Offer={offer} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="bg-white">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
              <h2 className="inline text-3xl font-extrabold tracking-tight text-gray-900 sm:block sm:text-4xl">
                Want product news and updates?
              </h2>
              <p className="inline text-3xl font-extrabold tracking-tight text-red-600 sm:block sm:text-4xl">
                Sign up for our newsletter.
              </p>
              <form className="mt-8 sm:flex">
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="w-full px-5 py-3 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs border-gray-300 rounded-md"
                  placeholder="Enter your email"
                />
                <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Notify me
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
