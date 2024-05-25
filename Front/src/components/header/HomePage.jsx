import React, { useState, useEffect } from "react";
import OfferItemSection from "../offers/OfferItemSection";
import { API_URL } from "../../config";

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

  return (
    <>
      <main>
        <div className="relative bg-gray-100 lg:bg-transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:grid lg:grid-cols-2 lg:gap-8">
            <div className="max-w-2xl mx-auto py-24 lg:py-64 lg:max-w-none">
              
              <div className="lg:pr-16"              >
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
      </main>
    </>
  );
}
