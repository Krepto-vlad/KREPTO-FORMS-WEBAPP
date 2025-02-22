import axios from "axios";

const axiosClient = axios.create({
  
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/auth`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
                                      console.log("axs client created", import.meta.env.VITE_API_BASE_URL);
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export default axiosClient;
