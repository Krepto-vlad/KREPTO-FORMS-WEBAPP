import axiosClient from "./axiosClient";
import {
    RegisterUser,
    LoginUser,
    AxiosErrorResponse
  } from "../types/authTypes";
  
export const registerUser = async (formData: RegisterUser) => {
  try {
    const response = await axiosClient.post("/register", formData);
    return response.data; // Возвращает и user, и token
  } catch (err) {
    const error = err as AxiosErrorResponse;
    throw new Error(error.response?.data?.message || "Registration failed");
  }
};

export const loginUser = async ({ email, password }: LoginUser) => {
  try {
    const response = await axiosClient.post("/login", { email, password });
    return response.data; // Возвращает и user, и token
} catch (err) {
    const error = err as AxiosErrorResponse;
    throw new Error(error.response?.data?.message || "Login failed");
  }
};
