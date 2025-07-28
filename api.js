// api.js @rycoe
// This file contains functions to interact with the backend API for user authentication
import axios from "axios";

const BASE_URL = "https://c7eaf16a0db4.ngrok-free.app"; // using ngrok provided url address @rycoe
// it will refresh if i turn off my computer or if the ngrok session expires

export const signup = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/auth/signup`, userData);
    return response.data;
  } catch (error) {
    return error.response?.data || "Signup error";
  }
}; // Function to handle user registration

export const login = async (credentials) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/auth/login`, credentials);
    return response.data;
  } catch (error) {
    return error.response?.data || "Login error";
  }
}; // Function to handle user login
