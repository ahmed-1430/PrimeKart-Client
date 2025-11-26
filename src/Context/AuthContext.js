/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/lib/FireBase.init";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);


    // LOGOUT FUNCTION
 
    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("primekart_user");
        localStorage.removeItem("primekart_token");
    };

  
    // SAVE USER + TOKEN
 
    const saveAuth = (userData, jwtToken) => {
        setUser(userData);
        setToken(jwtToken);
        localStorage.setItem("primekart_user", JSON.stringify(userData));
        localStorage.setItem("primekart_token", jwtToken);
    };

  
    // CHECK USER ON REFRESH
    useEffect(() => {
        const storedUser = localStorage.getItem("primekart_user");
        const storedToken = localStorage.getItem("primekart_token");

        if (!storedUser || !storedToken) {
            setLoading(false);
            return;
        }

        setUser(JSON.parse(storedUser));
        setToken(storedToken);

        // Validate token
        axios
            .get("http://localhost:3000/api/users/me", {
                headers: { Authorization: `Bearer ${storedToken}` },
            })
            .then((res) => {
                setUser(res.data.user); // refresh user data
            })
            .catch(() => {
                logout(); // invalid token
            })
            .finally(() => setLoading(false));
    }, []);


    // NORMAL LOGIN
    const login = async ({ email, password }) => {
        try {
            const res = await axios.post(
                "http://localhost:3000/api/users/login",
                { email, password }
            );

            saveAuth(res.data.user, res.data.token);
            return { ok: true };
        } catch (err) {
            return {
                ok: false,
                message: err.response?.data?.message || "Login failed",
            };
        }
    };

    // REGISTER
    const registerUser = async ({ name, email, password }) => {
        try {
            const res = await axios.post(
                "http://localhost:3000/api/users/register",
                { name, email, password }
            );

            saveAuth(res.data.user, res.data.token);
            return { ok: true };
        } catch (err) {
            return {
                ok: false,
                message: err.response?.data?.message || "Registration failed",
            };
        }
    };

    // GOOGLE LOGIN
    const loginWithGoogle = async () => {
        try {
            const googleRes = await signInWithPopup(auth, googleProvider);
            const profile = googleRes.user;

            const res = await axios.post(
                "http://localhost:3000/api/users/google",
                {
                    name: profile.displayName,
                    email: profile.email,
                    avatar: profile.photoURL,
                    googleId: profile.uid,
                }
            );

            saveAuth(res.data.user, res.data.token);
            return { ok: true };
        } catch (err) {
            return {
                ok: false,
                message: err.response?.data?.message || "Google login failed",
            };
        }
    };

    
    // PROVIDER EXPORT

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                loading,
                login,
                registerUser,
                loginWithGoogle,
                logout,
            }}
        >
            {!loading && children}
        </AuthContext.Provider>
    );
}
