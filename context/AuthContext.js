// context/AuthContext.js
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
// Import your API functions. We'll update `api.js` to export a default instance later.
import { login as apiLogin, signup as apiSignup } from "../api";
// Also import the api instance itself if you want to set the logout handler on it
import api from "../api"; // Assuming api.js now exports default 'api' instance

// Create the AuthContext
export const AuthContext = createContext(null);

// AuthProvider component that wraps your application
export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: null,
    isAuthenticated: false,
    user: null,
  });
  const [loading, setLoading] = useState(true);

  // Function to check authentication status from AsyncStorage
  const checkAuthStatus = useCallback(async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("jwtToken");
      const userJson = await AsyncStorage.getItem("user");

      if (token && userJson) {
        setAuthState({
          token: token,
          isAuthenticated: true,
          user: JSON.parse(userJson),
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

      if (
        response.status === "success" &&
        response.data &&
        response.data.token
      ) {
        await AsyncStorage.setItem("jwtToken", response.data.token);
        await AsyncStorage.setItem("user", JSON.stringify(response.data.user));
        setAuthState({
          token: response.data.token,
          isAuthenticated: true,
          user: response.data.user,
        });
        return { success: true, message: "Login successful!" };
      } else {
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
    console.log("AuthContext: Performing logout...");
    await AsyncStorage.removeItem("jwtToken");
    await AsyncStorage.removeItem("user");
    setAuthState({
      token: null,
      isAuthenticated: false,
      user: null,
    });
    // NO NEED to directly navigate here. App.js will re-render based on authState.isAuthenticated
  }, []);

  // Signup function
  const signup = useCallback(async (userData) => {
    try {
      setLoading(true);
      const response = await apiSignup(userData);
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

  // Set the logout function on the imported 'api' instance
  // This allows the axios interceptor in api.js to call AuthContext's logout
  useEffect(() => {
    api.setLogoutHandler(logout);
    // Cleanup if component unmounts (though for AuthProvider, it rarely does)
    return () => {
      api.setLogoutHandler(null);
    };
  }, [logout]); // Depend on 'logout' to re-set if it changes (though useCallback should prevent this)

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
