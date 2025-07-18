// context/AuthContext.js
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { login as apiLogin, signup as apiSignup } from "../api"; // Assuming your API functions are in '../api'

// Create the AuthContext
const AuthContext = createContext(null);

// AuthProvider component that wraps your application
export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: null,
    isAuthenticated: false,
    user: null, // You might store user details here (e.g., email, id)
  });
  const [loading, setLoading] = useState(true);

  // Function to check authentication status from AsyncStorage
  const checkAuthStatus = useCallback(async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("jwtToken");
      const userJson = await AsyncStorage.getItem("user"); // NEW: Also retrieve user details

      if (token && userJson) {
        setAuthState({
          token: token,
          isAuthenticated: true,
          user: JSON.parse(userJson), // Parse the stored user JSON
        });
      } else {
        setAuthState({
          token: null,
          isAuthenticated: false,
          user: null,
        });
      }
    } catch (e) {
      console.error("Failed to check auth status:", e);
      setAuthState({
        token: null,
        isAuthenticated: false,
        user: null,
      });
    } finally {
      setLoading(false);
    }
  }, []);

  // Login function
  const login = useCallback(async (credentials) => {
    try {
      setLoading(true);
      const response = await apiLogin(credentials);

      // --- FIX: Correctly check backend 'status' and access nested 'data.token' and 'data.user' ---
      if (
        response.status === "success" &&
        response.data &&
        response.data.token
      ) {
        await AsyncStorage.setItem("jwtToken", response.data.token); // Store the token
        await AsyncStorage.setItem("user", JSON.stringify(response.data.user)); // Store user details
        setAuthState({
          token: response.data.token,
          isAuthenticated: true,
          user: response.data.user, // Set user details from response
        });
        return { success: true, message: "Login successful!" };
      } else {
        // Handle cases where status is not 'success' or data/token is missing
        // Prioritize backend message, then data.message, then a generic message
        const errorMessage =
          response.message ||
          response.data?.message ||
          "Login failed. Please check your credentials.";
        return { success: false, message: errorMessage };
      }
    } catch (error) {
      console.error(
        "Login error:",
        error.response?.data || error.message || error
      );
      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Network error or unexpected login failure.",
      };
    } finally {
      setLoading(false);
    }
  }, []);

  // Logout function
  const logout = useCallback(async () => {
    await AsyncStorage.removeItem("jwtToken");
    await AsyncStorage.removeItem("user"); // NEW: Remove user data on logout
    setAuthState({
      token: null,
      isAuthenticated: false,
      user: null,
    });
  }, []);

  // Signup function
  const signup = useCallback(async (userData) => {
    try {
      setLoading(true);
      const response = await apiSignup(userData);
      // Assuming apiSignup returns { success: true } or { status: 'success' }
      // Adjust this condition based on your actual signup API response structure
      if (response.success || response.status === "success") {
        return {
          success: true,
          message: response.message || "Signup successful! Please log in.",
        };
      } else {
        const errorMessage =
          response.message || response.data?.message || "Signup failed.";
        return {
          success: false,
          message: errorMessage,
        };
      }
    } catch (error) {
      console.error(
        "Signup error:",
        error.response?.data || error.message || error
      );
      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Network error or unexpected signup failure.",
      };
    } finally {
      setLoading(false);
    }
  }, []);

  // Run checkAuthStatus on component mount
  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  return (
    <AuthContext.Provider
      value={{ authState, login, logout, signup, checkAuthStatus, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to consume the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
