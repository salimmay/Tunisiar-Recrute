import React from "react";
import {Routes, Route } from "react-router-dom";
import Main from "../components/pages/Main";
import AllOffers from "../components/pages/AllOffers";
import Login from "../components/pages/Login";
import Contact from "../components/pages/Contact";
import SignUp from "../components/pages/SignUp";
import Blog from "../components/pages/Blog";
import OfferDetailsItem from "../components/offers/OfferDetailsItem";
import About from "../components/pages/About";
import Error from "../components/pages/Error";
import Profile from "../users/supervisor/pages/authentication/profile/SupervisorProfile";
import SupervisorProfileContent from "../users/supervisor/pages/authentication/profile/SupervisorProfileContent"
import Applications from "../users/supervisor/pages/authentication/profile/Applications";
import Workshops from "../users/supervisor/pages/authentication/profile/Workshops";
import Calendar from "../users/supervisor/pages/authentication/profile/Calendar";
import AddWorkshop from "../users/supervisor/pages/authentication/profile/AddWorkshop";
import ModifyWorkshop from "../users/supervisor/pages/authentication/profile/ModifyWorkshop";


const SupervisorRoutes = () => {
  console.log("supervisor");

  return (
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="*" element={<Error />} />
        <Route path="careers" element={<AllOffers />} />
        <Route path="Login" element={<Login />} />
        <Route path="contact" element={<Contact />} />
        <Route path="blog" element={<Blog />} />
        <Route path="about" element={<About />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="OfferDetailsItem/:id" element={<OfferDetailsItem />} />
        <Route path="profile" element={<Profile />}>
           <Route path="SupervisorProfileContent"element={<SupervisorProfileContent />}/>
           <Route path="calendar" element={<Calendar />} />
           <Route path="applications" element={<Applications />} />
           <Route path="workshops" element={<Workshops />} />
           <Route path="AddWorkshop" element={<AddWorkshop />} />
           <Route path="ModifyWorkshop" element={<ModifyWorkshop />} />
        </Route>
      </Routes>
  );
};

export default SupervisorRoutes;
