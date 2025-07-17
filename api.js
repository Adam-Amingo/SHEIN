// api.js @rycoe
// This file contains functions to interact with the backend API for user authentication
import axios from "axios";

const BASE_URL = "https://f510-154-161-110-174.ngrok-free.app/api/users"; // using ngrok provided url address @rycoe
// it will refresh if i turn off my computer or if the ngrok session expires

export const signup = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/signup`, userData);
    return response.data;
  } catch (error) {
    return error.response?.data || "Signup error";
  }
}; // Function to handle user registration

export const login = async (credentials) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, credentials);
    return response.data;
  } catch (error) {
    return error.response?.data || "Login error";
  }
}; // Function to handle user login
