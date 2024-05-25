import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Main from "../components/pages/Main";
import AllOffers from "../components/pages/AllOffers";
import Login from "../components/pages/Login";
import Contact from "../components/pages/Contact";
import SignUp from "../components/pages/SignUp";
import Blog from "../components/pages/Blog";
import OfferDetailsItem from "../components/offers/OfferDetailsItem";
import About from "../components/pages/About";
import ApplicationForm from "../components/offers/ApplicationForm";
import Quiz from "../components/offers/Quiz";
import Profile from "../users/intern/authentication/profile/InternProfile";
import Applications from "../users/intern/authentication/profile/Applications";
import InternProfileContent from "../users/intern/authentication/profile/InternProfileContent";
import ForgotPassword from "../components/pages/ForgotPassword";
import Workshops from "../users/intern/authentication/profile/InternWorkshops";
import Error from "../components/pages/Error";
import { AuthProvider } from "../components/contexts/AuthProvider";

const InternRoutes = () => {
  console.log("intern");
  const user = localStorage.getItem("user");
  const location =useLocation()

 useEffect(()=>{
  AuthProvider(JSON.parse(user))
 },[location,user]
)
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="*" element={<Error />} />
      <Route path="careers" element={<AllOffers />} />
      <Route path="offerDetailsItem/:id" element={<OfferDetailsItem />} />
      <Route path="applicationForm" element={<ApplicationForm />} />
      <Route path="quiz" element={<Quiz />} />
      <Route path="about" element={<About />} />
      <Route path="blog" element={<Blog />} />
      <Route path="login" element={<Login />} />
      <Route path="forgotPassword" element={<ForgotPassword />} />
      <Route path="contact" element={<Contact />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="profile" element={<Profile />}>
        <Route path="internProfileContent" element={<InternProfileContent />} />
        <Route path="applications" element={<Applications />} />
        <Route path="workshops" element={<Workshops />} />
      </Route>
    </Routes>
  );
};

export default InternRoutes;
