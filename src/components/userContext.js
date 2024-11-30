import React, { createContext, useState, useEffect } from "react";

// Create a context for the user
export const UserContext = createContext();

// Create a provider component to wrap around your app
export const UserProvider = ({ children }) => {
  // Retrieve the username from localStorage on initialization
  const [userName, setUserName] = useState(() => {
    return localStorage.getItem("userName") || "";
  });

  const setUser = (name) => {
    setUserName(name);
    // Save the username to localStorage
    localStorage.setItem("userName", name);
  };

  // Effect to keep localStorage updated if needed (optional)
  useEffect(() => {
    if (userName) {
      localStorage.setItem("userName", userName);
    }
  }, [userName]);

  return (
    <UserContext.Provider value={{ userName, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
