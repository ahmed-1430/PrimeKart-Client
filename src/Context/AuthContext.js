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

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("primekart_user");
        localStorage.removeItem("primekart_token");
    };

    // Load user + token on refresh
    useEffect(() => {
        const storedUser = localStorage.getItem("primekart_user");
        const storedToken = localStorage.getItem("primekart_token");

        if (storedUser && storedToken) {
            setUser(JSON.parse(storedUser));
            setToken(storedToken);

            // Validate token by fetching /me
            axios.get("http://localhost:5000/api/users/me", {
                headers: { Authorization: `Bearer ${storedToken}` },
            })
                .then(res => setUser(res.data.user))
                .catch(() => logout()); // invalid token → logout
        }

        setLoading(false);
    }, []);

    const saveAuth = (user, token) => {
        setUser(user);
        setToken(token);
        localStorage.setItem("primekart_user", JSON.stringify(user));
        localStorage.setItem("primekart_token", token);
    };



    // NORMAL LOGIN
    const login = async ({ email, password }) => {
        try {
            const res = await axios.post("http://localhost:5000/api/users/login", {
                email,
                password,
            });

            saveAuth(res.data.user, res.data.token);
            return { ok: true };
        } catch (error) {
            return { ok: false, message: error.response?.data?.message };
        }
    };

    // REGISTER
    const registerUser = async ({ name, email, password }) => {
        try {
            const res = await axios.post("http://localhost:5000/api/users/register", {
                name,
                email,
                password,
            });

            saveAuth(res.data.user, res.data.token);
            return { ok: true };
        } catch (error) {
            return { ok: false, message: error.response?.data?.message };
        }
    };

    // GOOGLE LOGIN
    const loginWithGoogle = async () => {
        try {
            const googleRes = await signInWithPopup(auth, googleProvider);
            const profile = googleRes.user;

            // send google user to backend
            const res = await axios.post("http://localhost:5000/api/users/google", {
                name: profile.displayName,
                email: profile.email,
                avatar: profile.photoURL,
                googleId: profile.uid,
            });

            saveAuth(res.data.user, res.data.token);
            return { ok: true };
        } catch (error) {
            return { ok: false, message: error.message };
        }
    };

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
            {children}
        </AuthContext.Provider>
    );
}
