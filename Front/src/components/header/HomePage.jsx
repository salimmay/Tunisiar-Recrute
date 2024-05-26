import React, { useState, useEffect } from "react";
import OfferItemSection from "../offers/OfferItemSection";
import { API_URL } from "../../config";
import {
  GlobeAltIcon,
  LightningBoltIcon,
  ScaleIcon,
  CheckIcon,
} from "@heroicons/react/outline";

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
      name: "SignIN",
      description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.",    },
    {
      name: "Choose your internship",
      description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.",
    },
    {
      name: "Fill the application Form",
      description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.",
    },
  ];
  return (
    <>
      <main>
        <div className="relative bg-gray-100 lg:bg-transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:grid lg:grid-cols-2 lg:gap-8">
            <div className="max-w-2xl mx-auto py-24 lg:py-64 lg:max-w-none">
              <div className="lg:pr-16">
                <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl xl:text-6xl">
                  Focus on what matters
                </h1>
                <p className="mt-4 text-xl text-gray-600">
                  Build your careers with us
                </p>
                <div className="mt-6">
                  <a
                    href="/careers"
                    className="inline-block bg-red-600 border border-transparent py-3 px-8 rounded-md font-medium text-white hover:bg-red-700"
                  >
                    Careers
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <section>
          <div className="bg-white">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-10 lg:px-8 lg:grid lg:grid-cols-3 lg:gap-x-5">
              <div>
                <h2 className="text-base font-semibold text-red-600 uppercase tracking-wide">
                  Everything you need
                </h2>
                <p className="mt-2 text-3xl font-extrabold text-gray-900">
                  To deploy your Application
                </p>
                <p className="mt-4 text-lg text-gray-500">
                  In three Simple steps you can find whats best for you
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
