import React from "react";
import { Route, Routes } from "react-router-dom";
import Main from "../components/pages/Main";
import AllOffers from "../components/pages/AllOffers";
import Login from "../components/pages/Login";
import Contact from "../components/pages/Contact";
import SignUp from "../components/pages/SignUp";
import Blog from "../components/pages/Blog";
import About from "../components/pages/About";
import OfferDetailsItem from "../components/offers/OfferDetailsItem";
import ForgotPassword from "../components/pages/ForgotPassword";
import ApplicationForm from "../components/offers/ApplicationForm";
import Quiz from "../components/offers/Quiz";
import Error from "../components/pages/Error";

const PublicRoutes = () => {
  console.log("Public");

  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="*" element={<Error />} />
      <Route path="/careers" element={<AllOffers />} />
      <Route path="/login" element={<Login />} />
      <Route path="/ForgotPassword" element={<ForgotPassword />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/about" element={<About />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/offerDetailsItem/:id" element={<OfferDetailsItem />} />
      <Route path="/applicationForm" element={<ApplicationForm />} />
      <Route path="/quiz" element={<Quiz />} />
    </Routes>
  );
};

export default PublicRoutes;
