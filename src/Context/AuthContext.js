"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/lib/FireBase.init";
import Cookies from "js-cookie";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const API = "https://prime-kart-server.vercel.app";

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    /* ---------------- SAVE AUTH ---------------- */
    const saveAuth = (userData, jwtToken) => {
        setUser(userData);
        setToken(jwtToken);

        // localStorage (client usage)
        localStorage.setItem("primekart_user", JSON.stringify(userData));
        localStorage.setItem("primekart_token", jwtToken);

        // cookie (middleware usage)
        Cookies.set("primekart_token", jwtToken, {
            expires: 7,
            secure: true,
            sameSite: "strict",
        });

        // axios default header
        axios.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`;
    };

    /* ---------------- LOGOUT ---------------- */
    const logout = () => {
        setUser(null);
        setToken(null);

        localStorage.removeItem("primekart_user");
        localStorage.removeItem("primekart_token");
        Cookies.remove("primekart_token");

        delete axios.defaults.headers.common["Authorization"];
    };

    /* ---------------- RESTORE SESSION ---------------- */
    useEffect(() => {
        const restoreSession = async () => {
            try {
                const storedUser = localStorage.getItem("primekart_user");
                const storedToken = localStorage.getItem("primekart_token");

                if (!storedUser || !storedToken) {
                    setLoading(false);
                    return;
                }

                setUser(JSON.parse(storedUser));
                setToken(storedToken);

                axios.defaults.headers.common["Authorization"] =
                    `Bearer ${storedToken}`;

                // verify token + refresh user data
                const res = await axios.get(`${API}/api/users/me`);

                // merge to avoid role loss
                setUser((prev) => ({
                    ...prev,
                    ...res.data,
                }));
            } catch (err) {
                logout();
            } finally {
                setLoading(false);
            }
        };

        restoreSession();
    }, []);

    /* ---------------- LOGIN ---------------- */
    const login = async ({ email, password }) => {
        try {
            const res = await axios.post(`${API}/api/users/login`, {
                email,
                password,
            });

            saveAuth(res.data.user, res.data.token);
            return { ok: true };
        } catch (err) {
            return {
                ok: false,
                message: err.response?.data?.message || "Login failed",
            };
        }
    };

    /* ---------------- REGISTER ---------------- */
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

    /* ---------------- GOOGLE LOGIN ---------------- */
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
            {children}
        </AuthContext.Provider>
    );
}
