import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./OfferDetailsItem.css";
import { API_URL } from "../../config";

const OfferDetailsItem = () => {
  const [offer, setOffer] = useState({});
  const { id } = useParams();

  useEffect(() => {
    fetch(`${API_URL}/internshipOffers/${id}`, {
      method: "GET",
    })
      .then((data) => data.json())
      .then((data) => {
        setOffer(data);
      });
  }, [id]);

  return (
    <div className="offer-details-container">
      <div className="offer-details-content">
        <div className="offer-details-header">
          <h2 className="offer-details-title">Offer Specifications</h2>
        </div>
        <dl className="offer-details-list">
          <div className="offer-details-item">
            <dt className="offer-details-label">Title</dt>
            <dd className="offer-details-value">{offer.title}</dd>
            <dt className="offer-details-label">Department</dt>
            <dd className="offer-details-value">{offer.department}</dd>
            <dt className="offer-details-label">Location</dt>
            <dd className="offer-details-value">{offer.location}</dd>
            <dt className="offer-details-label">Description</dt>
            <dd className="offer-details-value">{offer.description}</dd>
          </div>
        </dl>
        <Link to={`/ApplicationForm/${id}`} className="offer-apply-link">
          <button className="offer-apply-button">Apply</button>
        </Link>
      </div>
    </div>
  );
};

export default OfferDetailsItem;
