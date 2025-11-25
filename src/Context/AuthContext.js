"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/lib/FireBase.init";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const stored = localStorage.getItem("primekart_user");
        if (stored) {
            try {
                setUser(JSON.parse(stored));
            } catch {
                localStorage.removeItem("primekart_user");
            }
        }
        setLoading(false);
    }, []);

    const saveUser = (u) => {
        setUser(u);
        localStorage.setItem("primekart_user", JSON.stringify(u));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("primekart_user");
    };

    const login = async ({ email, password }) => {
        try {
            const res = await fetch("http://localhost:3000/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message);

            saveUser(data.user);
            return { ok: true };
        } catch (error) {
            return { ok: false, message: error.message };
        }
    };

    // FIXED: registerUser instead of register
    const registerUser = async ({ name, email, password }) => {
        try {
            const res = await fetch("http://localhost:3000/users/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message);

            return { ok: true };
        } catch (error) {
            return { ok: false, message: error.message };
        }
    };

    const loginWithGoogle = async () => {
        try {
            const res = await signInWithPopup(auth, googleProvider);
            const profile = res.user;

            const googleUser = {
                id: profile.uid,
                name: profile.displayName,
                email: profile.email,
                avatar: profile.photoURL,
            };

            saveUser(googleUser);
            return { ok: true };
        } catch (error) {
            return { ok: false, message: error.message };
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
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
