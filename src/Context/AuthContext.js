/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/lib/FireBase.init";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const API = "https://prime-kart-server.vercel.app";

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    // ---- Save Auth ----
    const saveAuth = (userData, jwtToken) => {
        setUser(userData);
        setToken(jwtToken);

        localStorage.setItem("primekart_user", JSON.stringify(userData));
        localStorage.setItem("primekart_token", jwtToken);

        // Attach Token to axios
        axios.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`;
    };

    // ---- Logout ----
    const logout = () => {
        setUser(null);
        setToken(null);

        localStorage.removeItem("primekart_user");
        localStorage.removeItem("primekart_token");

        delete axios.defaults.headers.common["Authorization"];
    };

    // ---- Restore Session on Page Refresh ----
    useEffect(() => {
        const storedUser = localStorage.getItem("primekart_user");
        const storedToken = localStorage.getItem("primekart_token");

        if (!storedUser || !storedToken) {
            setLoading(false);
            return;
        }

        setUser(JSON.parse(storedUser));
        setToken(storedToken);

        axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;

        // Verify Token
        axios
            .get(`${API}/api/users/me`)
            .then((res) => {
                setUser(res.data); // backend returns user info directly
            })
            .catch(() => {
                // console.log("Invalid or expired token — logging out.");
                logout();
            })
            .finally(() => setLoading(false));
    }, []);

    // ---- Login ----
    const login = async ({ email, password }) => {
        try {
            const res = await axios.post(`${API}/api/users/login`, {
                email,
                password,
            });

            // backend returns:
            // { user: { ... }, token: "JWT" }
            saveAuth(res.data.user, res.data.token);

            return { ok: true };
        } catch (err) {
            return {
                ok: false,
                message: err.response?.data?.message || "Login failed",
            };
        }
    };

    // ---- Register ----
    const registerUser = async ({ name, email, password }) => {
        try {
            const res = await axios.post(`${API}/api/users/register`, {
                name,
                email,
                password,
            });

            saveAuth(res.data.user, res.data.token);

            return { ok: true };
        } catch (err) {
            return {
                ok: false,
                message: err.response?.data?.message || "Registration failed",
            };
        }
    };

    // ---- Google Login ----
    const loginWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const profile = result.user;

            const res = await axios.post(`${API}/api/users/google`, {
                name: profile.displayName,
                email: profile.email,
                avatar: profile.photoURL,
                googleId: profile.uid,
            });

            saveAuth(res.data.user, res.data.token);

            return { ok: true };
        } catch (err) {
            return {
                ok: false,
                message: err.response?.data?.message || "Google login failed",
            };
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
            {!loading && children}
        </AuthContext.Provider>
    );
}
