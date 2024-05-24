import { useEffect, useState } from "react";
import { parseJwt } from "../utils/parseJwt";
import API from "../../service/api";

export function useUser() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    const fetchUserData = async (id) => {
      try {
        const response = await API.get(`/users/user/${id}`);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetch = async () => {
      try {
        const decodedToken = parseJwt(token);
        if (decodedToken && decodedToken._id) {
          await fetchUserData(decodedToken._id);
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        setLoading(false);
      }
    };

    fetch();
  }, []);

  return { user, loading };
}
