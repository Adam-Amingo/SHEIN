// ThemeContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  const [darkTheme, setDarkTheme] = useState(false); // Default to false

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const storedTheme = await AsyncStorage.getItem("darkTheme");
        if (storedTheme !== null) {
          setDarkTheme(JSON.parse(storedTheme));
        }
      } catch (e) {
        console.error("Failed to load theme from storage:", e);
      }
    };
    loadTheme();
  }, []);

  const toggleTheme = async () => {
    const newTheme = !darkTheme;
    setDarkTheme(newTheme);
    try {
      await AsyncStorage.setItem("darkTheme", JSON.stringify(newTheme));
    } catch (e) {
      console.error("Failed to save theme to storage:", e);
    }
  };

  // The value provided by the context
  const value = {
    darkTheme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

// Custom hook to consume the ThemeContext
// This is the part that needs to be explicitly exported
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
