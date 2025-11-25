"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // load user from localStorage (persist across refresh)
    useEffect(() => {
        const raw = localStorage.getItem("primekart_user");
        if (raw) {
            try {
                const parsed = JSON.parse(raw);
                setUser(parsed);
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

    const clearUser = () => {
        setUser(null);
        localStorage.removeItem("primekart_user");
    };

    // login: call your backend /users/login and save user object
    const login = async ({ email, password }) => {
        try {
            const res = await fetch("/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Login failed");
            // server returns user object in data.user
            saveUser(data.user);
            return { ok: true, user: data.user };
        } catch (err) {
            return { ok: false, message: err.message };
        }
    };

    // register: call your backend /users/register then optionally auto-login
    const register = async ({ name, email, password }) => {
        try {
            const res = await fetch("/users/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Register failed");
            return { ok: true, message: data.message };
        } catch (err) {
            return { ok: false, message: err.message };
        }
    };

    const logout = () => {
        clearUser();
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
