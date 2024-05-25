import axios from "axios";
import { API_URL } from "../../config";

export const AuthProvider = async (user) => {
  try {
    const headers = {
      "x-auth-user": JSON.stringify(user),
    };
    await axios.get(`${API_URL}/users/auth`, {
      headers,
    });
  } catch (error) {
    localStorage.removeItem("user");
    window.location.href = "/";
  }
};
