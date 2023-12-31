"use client";

import { createContext, useContext, useState, useEffect } from "react";
const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("loggedIn") ? true : false;
    }
  });

  const [user, setUser] = useState(() => {
    if (typeof window !== "undefined") {
      const localUser = localStorage.getItem("localUser");
      return localUser ? JSON.parse(localUser) : {};
    }
  });
  return (
    <AuthContext.Provider value={{ loggedIn, setLoggedIn, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
