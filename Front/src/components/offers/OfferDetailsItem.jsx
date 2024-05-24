import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./OfferDetailsItem.css";
//import useGet from "../data/Functions/useGet";
import { API_URL } from "../../config";

const OfferDetailsItem = () => {
  const [offer, setOffer] = useState([]);
  useEffect(()=>{
    const url = window.location.href
    const id = url.split("/").slice(-1)
  
    fetch(`${API_URL}/internshipOffers/${id}`, {
        method: "Get",
      })
        .then((data) => data.json())
        .then((data) => {
          setOffer(data);
        });
  
  },[])
 
  // useEffect(() => {
  //   // Function to fetch data from the API
  //   const fetchData = async () => {
  //     try {
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       const data = await response.json();
  //       console.log(response)
  //       setOffer(data);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };
  //   fetchData(); // Call the function to fetch data when component mounts
  // }, []);
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
        <Link to={"/ApplicationForm"} className="offer-apply-link">
          <button className="offer-apply-button">Apply</button>
        </Link>
      </div>
    </div>
  );
};

export default OfferDetailsItem;
