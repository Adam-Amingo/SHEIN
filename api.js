// api.js
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const BASE_URL = "https://c7eaf16a0db4.ngrok-free.app";

// Create an Axios instance
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// A placeholder for the logout handler provided by AuthContext
let logoutHandler = null;

// Function to set the logout handler from AuthContext
api.setLogoutHandler = (handler) => {
  logoutHandler = handler;
};

// Request Interceptor: Add JWT token to all outgoing requests
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("jwtToken");
    // ADDED DEBUG LOGS
    console.log(`API Interceptor: Request to ${config.url}`);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log(
        `API Interceptor: Sending token: ${token.substring(0, 10)}...`
      ); // Log first 10 chars
    } else {
      console.log("API Interceptor: No token found in AsyncStorage.");
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Handle 401 Unauthorized errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      console.warn(
        "API Interceptor: Authentication token expired or unauthorized. Triggering logout..."
      );

      if (logoutHandler) {
        await logoutHandler();
      } else {
        console.error(
          "API Interceptor: No logout handler set on API instance."
        );
        await AsyncStorage.removeItem("jwtToken");
        await AsyncStorage.removeItem("user");
      }

      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

// --- All your existing API functions now use the 'api' instance ---

export const signup = async (userData) => {
  try {
    const response = await api.post(`/api/auth/signup`, userData);
    return response.data;
  } catch (error) {
    return error.response?.data || { success: false, message: "Signup error" };
  }
};

export const login = async (credentials) => {
  try {
    const response = await api.post(`/api/auth/login`, credentials);
    return response.data;
  } catch (error) {
    return error.response?.data || { success: false, message: "Login error" };
  }
};

export const getProducts = async (
  page = 0,
  size = 10,
  sort = "id,asc",
  category = null,
  subcategory = null
) => {
  try {
    const params = { page, size, sort };
    if (category && category !== "All") {
      params.category = category;
    }
    if (subcategory && subcategory !== "") {
      params.subcategory = subcategory;
    }
    const response = await api.get(`/api/products`, { params: params });
    return { success: true, data: response.data };
  } catch (error) {
    console.error(
      "Error fetching products:",
      error.response?.data || error.message
    );
    return {
      success: false,
      message: error.response?.data?.message || "Failed to fetch products",
    };
  }
};

export const getProductById = async (productId) => {
  try {
    const response = await api.get(`/api/products/${productId}`);
    return { success: true, data: response.data };
  } catch (error) {
    console.error(
      `Error fetching product by ID ${productId}:`,
      error.response?.data || error.message
    );
    return {
      success: false,
      message: error.response?.data?.message || "Failed to fetch product",
    };
  }
};

export const addItemToCart = async (itemData) => {
  try {
    const response = await api.post(`/api/carts/items`, itemData);
    return { success: true, data: response.data };
  } catch (error) {
    console.error(
      "Error adding item to cart:",
      error.response?.data || error.message
    );
    return (
      error.response?.data || {
        success: false,
        message: error.response?.data?.message || "Failed to add item to cart.",
      }
    );
  }
};

export const searchProducts = async (
  query,
  filters = {},
  page = 0,
  size = 10,
  sort = "id,asc"
) => {
  try {
    const params = { query, page, size, sort, ...filters };
    Object.keys(params).forEach((key) => {
      if (
        key !== "query" &&
        (params[key] === null ||
          params[key] === undefined ||
          params[key] === "")
      ) {
        delete params[key];
      }
    });
    console.log("Sending search request with params:", params);
    console.log(
      "Sending search request to URL:",
      `${api.defaults.baseURL}/api/search/products`
    );
    const response = await api.get(`/api/search/products`, { params: params });
    return { success: true, data: response.data };
  } catch (error) {
    console.error(
      "Error searching products:",
      error.response?.data || error.message
    );
    return {
      success: false,
      message: error.response?.data?.message || "Failed to search products",
    };
  }
};

export const getRecentSearches = async () => {
  try {
    const response = await api.get(`/api/search/recent`);
    return { success: true, data: response.data };
  } catch (error) {
    console.error(
      "Error fetching recent searches:",
      error.response?.data || error.message
    );
    return {
      success: false,
      message:
        error.response?.data?.message || "Failed to fetch recent searches",
    };
  }
};

export const getUserCart = async () => {
  try {
    const response = await api.get(`/api/carts`);
    return { success: true, data: response.data };
  } catch (error) {
    console.error(
      "Error fetching user cart:",
      error.response?.data || error.message
    );
    return {
      success: false,
      message: error.response?.data?.message || "Failed to fetch cart",
    };
  }
};

export const createOrder = async (orderData) => {
  try {
    const response = await api.post(`/api/orders`, orderData);
    return { success: true, data: response.data.data };
  } catch (error) {
    console.error(
      "Error creating order:",
      error.response?.data || error.message
    );
    return (
      error.response?.data || {
        success: false,
        message: error.response?.data?.message || "Failed to create order.",
      }
    );
  }
};

export const initiateMobileMoneyPayment = async (paymentDetails) => {
  try {
    const response = await api.post(
      `/api/payments/mobile-money/initiate`,
      paymentDetails
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error initiating mobile money payment:",
      error.response?.data || error.message
    );
    return (
      error.response?.data || {
        success: false,
        message: "Failed to initiate payment.",
      }
    );
  }
};

export default api;
