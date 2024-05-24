import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import Render from "./Routes/Routes";
import Footer from "./components/footer/Footer";
import NavBar from "./components/header/NavBar";
import Loader from "./Loader";
import './_loader.scss'; 

const App = () => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleRouteChange = () => {
      setLoading(true);
      setTimeout(() => setLoading(false), 1000); 
    };

    handleRouteChange();
  }, [location]);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <>
          <NavBar />
          <Render />
          <Footer />
        </>
      )}
    </div>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;