import api from "@/lib/axios";
export const getUserApplications = async (userId) => {
 // If your backend expects the ID in the URL: /applications/user/123
  const response = await api.get(`/applications/${userId}`);
  return response.data;
};
export const applyForInternship = async (formData) => {
  // We use FormData because we are uploading files (Resume/Cover Letter)
  // The backend expects 'multipart/form-data'
  const response = await api.post("/applications", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
export const getAllApplications = async () => {
  const response = await api.get("/applications");
  return response.data;
};

export const updateApplicationStatus = async ({ id, status }) => {
  const response = await api.put(`/applications/${id}`, { status });
  return response.data;
};