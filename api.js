// api.js @rycoe
// This file contains functions to interact with the backend API for user authentication and product fetching
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Ensure AsyncStorage is imported for token handling

const BASE_URL = "https://ed84e2a88035.ngrok-free.app"; // using ngrok provided url address @rycoe
// it will refresh if i turn off my computer or if the ngrok session expires

/**
 * Handles user registration.
 * @param {object} userData - User registration data (e.g., email, password).
 * @returns {Promise<object>} - Response data from the backend.
 */
export const signup = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/auth/signup`, userData);
    return response.data;
  } catch (error) {
    // Return the backend's error response data or a generic error message
    return error.response?.data || { success: false, message: "Signup error" };
  }
};

/**
 * Handles user login.
 * @param {object} credentials - User login credentials (email, password).
 * @returns {Promise<object>} - Response data from the backend, including token and user info on success.
 */
export const login = async (credentials) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/auth/login`,
      credentials
    );
    return response.data;
  } catch (error) {
    // Return the backend's error response data or a generic error message
    return error.response?.data || { success: false, message: "Login error" };
  }
};

/**
 * Fetches a list of products from the backend with optional pagination and filtering.
 * @param {number} [page=0] - The page number to fetch (0-indexed).
 * @param {number} [size=10] - The number of items per page.
 * @param {string} [sort='id,asc'] - Sorting criteria (e.g., 'name,asc', 'price,desc').
 * @param {string} [category=null] - Optional category to filter products by.
 * @param {string} [subcategory=null] - Optional subcategory to filter products by.
 * @returns {Promise<object>} - Response data from the backend, containing a 'content' array of products and pagination info.
 */
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

    const response = await axios.get(`${BASE_URL}/api/products`, {
      params: params,
    });
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

/**
 * Fetches a single product by its ID from the backend.
 * @param {string} productId - The ID of the product to fetch.
 * @returns {Promise<object>} - Response data from the backend, containing the product object.
 */
export const getProductById = async (productId) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/products/${productId}`);
    return { success: true, data: response.data }; // Backend now returns Product entity directly
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

/**
 * Adds an item to the user's cart. This also handles stock deduction on the backend.
 * @param {object} itemData - Object containing productId, quantity, and size.
 * @returns {Promise<object>} - Response from the backend about the updated cart.
 */
export const addItemToCart = async (itemData) => {
  try {
    const token = await AsyncStorage.getItem("jwtToken");
    if (!token) {
      return {
        success: false,
        message: "Authentication required to add item to cart.",
      };
    }
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const response = await axios.post(
      `${BASE_URL}/api/carts/items`,
      itemData, // itemData should contain productId, quantity, and size
      { headers: headers }
    );
    return { success: true, data: response.data }; // This will be CartResponse DTO
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

/**
 * Searches for products based on a query and optional filters.
 * @param {string} query - The search query string.
 * @param {object} [filters={}] - Optional filter object (minPrice, maxPrice, minRating, inStock).
 * @param {number} [page=0] - The page number to fetch (0-indexed).
 * @param {number} [size=20] - The number of items per page.
 * @param {string} [sort='id,asc'] - Sorting criteria.
 * @returns {Promise<object>} - Response data from the backend, containing a 'content' array of products and pagination info.
 */
export const searchProducts = async (
  query,
  filters = {},
  page = 0,
  size = 10, // Consider changing this to 20 to match backend @PageableDefault
  sort = "id,asc"
) => {
  try {
    const params = {
      query, // Always include the query, even if empty string
      page,
      size,
      sort,
      ...filters,
    };

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

    const token = await AsyncStorage.getItem("jwtToken");
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    console.log("Sending search request with params:", params);
    console.log(
      "Sending search request to URL:",
      `${BASE_URL}/api/search/products`
    );

    const response = await axios.get(`${BASE_URL}/api/search/products`, {
      params: params,
      headers: headers,
    });
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

/**
 * Fetches recent search terms for the authenticated user.
 * @returns {Promise<object>} - An object with success status and data (Set of strings).
 */
export const getRecentSearches = async () => {
  try {
    const token = await AsyncStorage.getItem("jwtToken");
    if (!token) {
      return {
        success: false,
        message: "Authentication required for recent searches.",
      };
    }
    const headers = { Authorization: `Bearer ${token}` };

    const response = await axios.get(`${BASE_URL}/api/search/recent`, {
      headers: headers,
    });
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

/**
 * Initiates a mobile money payment through the backend.
 * @param {object} paymentDetails - Object containing orderId, amount, customerEmail, mobileNumber, mobileNetwork.
 * @returns {Promise<object>} - Response from the backend about payment initiation.
 */
export const initiateMobileMoneyPayment = async (paymentDetails) => {
  try {
    const token = await AsyncStorage.getItem("jwtToken");
    if (!token) {
      return {
        success: false,
        message: "Authentication required for payment.",
      };
    }
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const response = await axios.post(
      `${BASE_URL}/api/payments/mobile-money/initiate`,
      paymentDetails,
      {
        headers: headers,
      }
    );
    return response.data; // This will be PaymentInitiationResponse DTO
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
