import React, { createContext, useState } from 'react';

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [darkTheme, setDarkTheme] = useState(false);
  const toggleTheme = () => setDarkTheme((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ darkTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}