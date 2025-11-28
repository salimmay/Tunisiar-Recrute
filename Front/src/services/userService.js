import api from "@/lib/axios";

export const getAllUsers = async () => {
  const response = await api.get("/users");
  return response.data;
};

export const deleteUser = async ({ id, password }) => {
  // Axios DELETE with body requires the 'data' key
  await api.delete(`/users/user/${id}`, {
    data: { password } 
  });
};

// Admin creating a user (bypassing public registration)
export const createUser = async (userData) => {
  const response = await api.post("/users/signup", userData);
  return response.data;
};