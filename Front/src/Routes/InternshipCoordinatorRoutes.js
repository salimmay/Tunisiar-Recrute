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
import Profile from "../users/internship-coordinator/pages/authentication/profile/InternshipCoordinatorProfile";
import InternshipCoordinatorProfileContent from "../users/internship-coordinator/pages/authentication/profile/InternshipCoordinatorProfileContent";
import Applications from "../users/internship-coordinator/pages/authentication/profile/Applications";
import AddInternshipOffer from "../users/internship-coordinator/pages/authentication/profile/AddInternshipOffer";
import AddQuiz from "../users/internship-coordinator/pages/authentication/profile/AddQuiz";
import Error from "../components/pages/Error";
import ManageInternshipOffer from "../users/internship-coordinator/pages/authentication/profile/ManageInternshipOffer";
import ModifyOffer from "../users/internship-coordinator/pages/authentication/profile/ModifyOffer";
import ModifyQuiz from "../users/internship-coordinator/pages/authentication/profile/ModifyQuiz";

const InternshipCoordinatorRoutes = () => {
  console.log("Internship Coordinator");

  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="*" element={<Error />} />
      <Route path="careers" element={<AllOffers />} />
      <Route path="OfferDetailsItem/:id" element={<OfferDetailsItem />} />
      <Route path="applicationForm" element={<ApplicationForm />} />
      <Route path="quiz" element={<Quiz />} />
      <Route path="about" element={<About />} />
      <Route path="blog" element={<Blog />} />
      <Route path="login" element={<Login />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
      <Route path="contact" element={<Contact />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="profile" element={<Profile />}>
        <Route path="profileContent" element={<InternshipCoordinatorProfileContent />} />
        <Route path="applications" element={<Applications />} />
        <Route path="ManageInternshipOffer" element={<ManageInternshipOffer />} />
        <Route path="AddInternshipOffer" element={<AddInternshipOffer />} />
        <Route path="AddQuiz" element={<AddQuiz />} />
        <Route path="ModifyOffer/:id" element={<ModifyOffer/>}/>
        <Route path="ModifyQuiz/:id" element={<ModifyQuiz/>}/>
      </Route>
    </Routes>
  );
};
export default InternshipCoordinatorRoutes;
