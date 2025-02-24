import axios from "axios";

const API_URL = "https://krepto-forms-backend.onrender.com";

export const createTemplate = async (formData: unknown) => {
  const token = localStorage.getItem("token");

  return axios.post(`${API_URL}/templates`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

export const getForms = async () => {
  return axios.get(`${API_URL}/forms`);
};
