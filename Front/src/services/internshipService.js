import api from "@/lib/axios";

export const getInternships = async () => {
  // This simulates a delay so you can see the skeleton loader (Remove setTimeout in production)
  // await new Promise(resolve => setTimeout(resolve, 1000)); 
  
  const response = await api.get("/internshipOffers");
  // Adjust this depending on if your backend returns { data: [...] } or just [...]
  return Array.isArray(response.data) ? response.data : response.data.data || [];
};