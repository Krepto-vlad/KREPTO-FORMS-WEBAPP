import axios from "axios";

const axiosClient = axios.create({
  
  baseURL: "https://krepto-forms-backend.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
console.log("axs client created");
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export default axiosClient;
