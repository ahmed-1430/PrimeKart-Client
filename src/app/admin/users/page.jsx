"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "@/Context/AuthContext";

export default function UsersPage() {
    const { token, loading } = useAuth();
    const [users, setUsers] = useState([]);
    const [pageLoading, setPageLoading] = useState(true);

    useEffect(() => {
        if (loading) return;

        async function loadUsers() {
            try {
                if (!token) {
                    toast.error("Unauthorized! Please login again.");
                    return;
                }

                const res = await axios.get(
                    "https://prime-kart-server.vercel.app/api/admin/users",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setUsers(res.data);
            } catch (err) {
                console.log("Users load error:", err);
                toast.error("Failed to load users");
            } finally {
                setPageLoading(false);
            }
        }

        loadUsers();
    }, [token, loading]);

    if (loading || pageLoading) {
        return (
            <div className="h-[60vh] flex items-center justify-center">
                <div className="animate-spin h-10 w-10 rounded-full border-4 border-purple-500 border-t-transparent"></div>
            </div>
        );
    }

    return (
        <div className="relative min-h-screen">
            {/* background glow */}
            <div className="absolute inset-0 -z-10 bg-linear-to-br from-purple-900/20 via-pink-900/20 to-indigo-900/20 blur-3xl" />

            {/* HEADER */}
            <div className="w-11/12 mx-auto mb-10">
                <h1 className="text-4xl font-black bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Users
                </h1>
                <p className="text-gray-400 mt-2">
                    Manage registered users and roles
                </p>
            </div>

            {/* USERS LIST */}
            <div className="w-11/12 mx-auto space-y-4">
                {users.map((u) => (
                    <div
                        key={u.id || u._id}
                        className="glass-panel flex items-center justify-between
                        hover:scale-[1.02] transition"
                    >
                        {/* USER INFO */}
                        <div className="flex items-center gap-4">
                            {/* AVATAR */}
                            <div className="w-12 h-12 rounded-full bg-linear-to-br from-purple-500 to-pink-500
                            flex items-center justify-center text-white font-bold text-lg shadow-md">
                                {u.name?.charAt(0).toUpperCase()}
                            </div>

                            <div>
                                <p className="font-semibold text-lg text-slate-500">
                                    {u.name}
                                </p>
                                <p className="text-slate-400 text-sm">
                                    {u.email}
                                </p>
                            </div>
                        </div>

                        {/* ROLE */}
                        <span
                            className={`px-4 py-1.5 rounded-full text-sm font-semibold backdrop-blur
                            ${u.role === "admin"
                                    ? "bg-purple-400/20 text-purple-500 border border-purple-500/40"
                                    : "bg-pink-300/10 text-gray-400 border border-pink-400/20"
                                }`}
                        >
                            {u.role}
                        </span>
                    </div>
                ))}

                {users.length === 0 && (
                    <div className="py-12 text-center text-gray-400">
                        No users found
                    </div>
                )}
            </div>
        </div>
    );
}
