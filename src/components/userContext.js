import React, { createContext, useState } from "react";

// Create a context for the user
export const UserContext = createContext();

// Create a provider component to wrap around your app
export const UserProvider = ({ children }) => {
  const [userName, setUserName] = useState("");

  const setUser = (name) => {
    setUserName(name);
  };

  return (
    <UserContext.Provider value={{ userName, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
