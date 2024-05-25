import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
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
import Profile from "../users/administrator/pages/authentication/profile/Profile";
import AdministratorProfileContent from "../users/administrator/pages/authentication/profile/AdministratorProfileContent";
import AddUser from "../users/administrator/pages/authentication/profile/AddUser";
import { AuthProvider } from "../components/contexts/AuthProvider";

const AdministratorRoutes = () => {
  console.log("administrator");
  const user = localStorage.getItem("user");
  const location = useLocation();

  useEffect(() => {
    AuthProvider(JSON.parse(user));
  }, [location, user]);
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="careers" element={<AllOffers />} />
      <Route path="login" element={<Login />} />
      <Route path="ForgotPassword" element={<ForgotPassword />} />
      <Route path="contact" element={<Contact />} />
      <Route path="blog" element={<Blog />} />
      <Route path="about" element={<About />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="offerDetailsItem/:id" element={<OfferDetailsItem />} />
      <Route path="applicationForm" element={<ApplicationForm />} />
      <Route path="quiz" element={<Quiz />} />
      <Route path="/profile" element={<Profile />}>
        <Route
          path="AdministratorProfileContent"
          element={<AdministratorProfileContent />}
        />
        <Route path="AddUser" element={<AddUser />} />
      </Route>
      <Route path="*" element={<Error />} />
    </Routes>
  );
};

export default AdministratorRoutes;
