import React from "react";
import { Link } from "react-router-dom";

const OfferItemSection = ({ Offer }) => {
  const link = "/OfferDetailsItem/"+Offer._id
  return (
    <div className="">
      <div
        className="card-wrapper  px-3"
        style={{ width: "300px", height: "380px" }}
      >
        <div className="card card-side bg-base-900 shadow-xl h-full  ">
          <figure>
            <img src={Offer.icon} alt="Offer" className="w-full h-auto" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{Offer.title}</h2>
            <p>{Offer.description}</p>
            <div className="card-actions justify-end">
              <Link to={link}>
                <button className="block w-full rounded-md bg-red-700 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-red-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">
                  Offer details
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferItemSection;
