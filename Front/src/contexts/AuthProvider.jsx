import { useEffect, useState } from "react";
import API from "../api/api";
import { parseJwt } from "../utils/parseJwt";

export function useUser() {
  const [userFound, setUserFound] = useState(false);
  const [output, setOutput] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token from localStorage:", token);

    const fetchUserData = async (id) => {
      try {
        const response = await API.get(`/users/user/${id}`);
        console.log("User data fetched:", response.data);
        return response.data;
      } catch (error) {
        console.error("Error fetching user data:", error);
        return null;
      }
    };

    const fetch = async () => {
      const decodedToken = parseJwt(token);
      console.log("Decoded token:", decodedToken);

      if (decodedToken && decodedToken.id) {
        const data = await fetchUserData(decodedToken.id);
        if (data) {
          setOutput(data);
          setUserFound(true);
        } else {
          setUserFound(false);
        }
      } else {
        setUserFound(false);
      }
    };

    if (token) {
      fetch();
    }
  }, []);

  return userFound ? output : userFound;
}
