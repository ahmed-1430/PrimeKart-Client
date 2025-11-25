"use client";

import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

 
  //  Load user from localStorage on first render

  useEffect(() => {
    const storedUser = localStorage.getItem("primekart_user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem("primekart_user");
      }
    }
    setLoading(false);
  }, []);

  // Save & Clear User
  const saveUser = (userData) => {
    setUser(userData);
    localStorage.setItem("primekart_user", JSON.stringify(userData));
  };

  const clearUser = () => {
    setUser(null);
    localStorage.removeItem("primekart_user");
  };


  //  LOGIN USER

  const login = async ({ email, password }) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Invalid credentials");

      saveUser(data.user);

      return { ok: true, user: data.user };
    } catch (err) {
      return { ok: false, message: err.message };
    }
  };


  //  REGISTER USER

  const register = async ({ name, email, password }) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Registration failed");

      return { ok: true, message: data.message };
    } catch (err) {
      return { ok: false, message: err.message };
    }
  };


  //  LOGOUT USER

  const logout = () => {
    clearUser();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
