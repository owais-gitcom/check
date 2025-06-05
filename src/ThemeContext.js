// ThemeContext.js
import React, { createContext, useContext, useState, useEffect } from "react";

// Create the context
const ThemeContext = createContext();

// ThemeProvider wraps around your app
export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(true);

  const toggleMode = () => setDarkMode(prev => !prev);

  useEffect(() => {
    document.body.classList.toggle("light-mode", !darkMode);
  }, [darkMode]);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook for using theme context
export const useTheme = () => useContext(ThemeContext);
