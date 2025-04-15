

"use client";

import React, { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import Axios from "@/utilities/Axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const router = useRouter();

  // Hydration check (runs once on client)
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsHydrated(true);
    }
  }, []);

  // Set login state if token exists
  useEffect(() => {
    if (isHydrated) {
      const token = localStorage.getItem("accessToken");
      if (token) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    }
  }, [isHydrated]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
