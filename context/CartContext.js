import React, { createContext, useState, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUserCart } from "../api"; // Import the new function from api.js
import axios from "axios"; // Make sure axios is imported
import { Alert } from "react-native"; // Make sure Alert is imported if you're using it
// Assuming BASE_URL is defined somewhere accessible, e.g., in a config file
import { BASE_URL } from "../api";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loadingCart, setLoadingCart] = useState(true);

  // Function to update local cart state (used internally)
  const updateLocalCart = useCallback((newItems) => {
    setCartItems(newItems);
  }, []);

  const fetchUserCart = useCallback(async () => {
    setLoadingCart(true);
    try {
      const token = await AsyncStorage.getItem("jwtToken");
      if (token) {
        const response = await getUserCart(); // Call backend API
        if (response.success && response.data.items) {
          // *** FIX 1 (from previous): Change response.data.cartItems to response.data.items ***
          const fetchedItems = response.data.items.map((item) => ({
            id: item.id, // This is the cartItemId from backend
            productId: item.productId, // This is the product's actual ID
            name: item.productName,
            // *** FIX 2 (from previous): Use priceAtAdd from backend ***
            price: item.priceAtAdd,
            quantity: item.quantity,
            // *** FIX 3 (from previous): 'size' is not returned by backend, remove or set default ***
            // size: item.size, // Remove or handle if not from backend
            image: item.productImage, // Add productImage from backend
            subtotal: item.subtotal, // Add subtotal from backend
          }));
          setCartItems(fetchedItems);
        } else {
          console.log("Failed to fetch user cart:", response.message);
          setCartItems([]);
        }
      } else {
        console.log("No JWT token found. Cart will be empty.");
        setCartItems([]);
      }
    } catch (error) {
      console.error("Error fetching cart from backend:", error);
      setCartItems([]);
    } finally {
      setLoadingCart(false);
    }
  }, []); // dependency array

  useEffect(() => {
    fetchUserCart();
  }, [fetchUserCart]);

  const addItem = useCallback(async (product, quantity, size) => {
    // 'size' parameter here is still unused if not passed to backend
    try {
      const token = await AsyncStorage.getItem("jwtToken");
      if (!token) {
        console.error("Not authenticated to add to cart.");
        Alert.alert(
          "Authentication Required",
          "Please log in to add items to cart."
        );
        return;
      }

      const response = await axios.post(
        `${BASE_URL}/api/carts/items`,
        {
          productId: product.id,
          quantity: quantity,
          // *** CONSIDER: If your backend needs 'size' for adding to cart, include it here: ***
          // size: size,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // *** FIX 4: Apply the same mapping corrections as in fetchUserCart for consistency ***
      if (response.data && response.data.items) {
        // Ensure it's response.data.items here
        const fetchedItems = response.data.items.map((item) => ({
          id: item.id, // cartItemId
          productId: item.productId, // product ID
          name: item.productName,
          price: item.priceAtAdd, // Use priceAtAdd
          quantity: item.quantity,
          //size: item.size, // Remove or set default if not from backend
          image: item.productImage, // Add productImage
          subtotal: item.subtotal, // Add subtotal
        }));
        setCartItems(fetchedItems); // Update cart with backend's response
        Alert.alert("Success", "Item added to cart!");
      } else {
        Alert.alert(
          "Error",
          response.data?.message || "Failed to add item to cart."
        );
        fetchUserCart();
      }
    } catch (error) {
      console.error(
        "Error adding item to cart:",
        error.response?.data || error.message
      );
      Alert.alert(
        "Error",
        error.response?.data?.message ||
          "Failed to add item to cart. Please try again."
      );
      fetchUserCart();
    }
  }, []);

  const clearCart = useCallback(async () => {
    try {
      const token = await AsyncStorage.getItem("jwtToken");
      if (!token) {
        console.error("Not authenticated to clear cart.");
        setCartItems([]);
        return;
      }
      // *** FIX 5: Use correct endpoint for clearing all items for a user's cart ***
      // Assuming your backend's DELETE /api/carts clears the entire cart
      await axios.delete(`${BASE_URL}/api/carts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCartItems([]);
      Alert.alert("Success", "Cart cleared!");
    } catch (error) {
      console.error(
        "Error clearing cart:",
        error.response?.data || error.message
      );
      Alert.alert(
        "Error",
        error.response?.data?.message ||
          "Failed to clear cart. Please try again."
      );
      fetchUserCart();
    }
  }, []);

  // *** NEW FUNCTION: Implement removeItemFromCart (as discussed) ***
  const removeItemFromCart = useCallback(async (productId) => {
    // Takes productId
    try {
      const token = await AsyncStorage.getItem("jwtToken");
      if (!token) {
        console.error("Not authenticated to remove item from cart.");
        Alert.alert(
          "Authentication Required",
          "Please log in to remove items from cart."
        );
        return;
      }

      // Call backend API to remove item
      await axios.delete(`${BASE_URL}/api/carts/items/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Optimistically update frontend cart: filter by productId
      setCartItems((prevItems) =>
        prevItems.filter((item) => item.productId !== productId)
      );
      Alert.alert("Success", "Item removed from cart!");
    } catch (error) {
      console.error(
        "Error removing item from cart:",
        error.response?.data || error.message
      );
      Alert.alert(
        "Error",
        error.response?.data?.message ||
          "Failed to remove item. Please try again."
      );
      fetchUserCart(); // Re-fetch actual cart state from backend on error
    }
  }, []);

  const cartContextValue = {
    cartItems,
    addItem,
    clearCart,
    loadingCart,
    fetchUserCart,
    removeItemFromCart, // *** NEW: Expose removeItemFromCart here so CartScreen can use it ***
    // Add any other cart management functions here (e.g., updateItemQuantity)
  };

  return (
    <CartContext.Provider value={cartContextValue}>
      {children}
    </CartContext.Provider>
  );
};
