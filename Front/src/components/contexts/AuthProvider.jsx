import { API_URL } from "../../config";

export const AuthProvider = async (user) => {
  try {
    const headers = {
      "x-auth-user": user,
    };
    const result = await fetch(`${API_URL}/users/auth`, {
      headers,
    });
    console.log(result);
  } catch (error) {
    console.log(error);
    localStorage.removeItem("user");
    window.location.href = "/";
  }
};
