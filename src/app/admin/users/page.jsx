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
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Users</h1>

            <div className="space-y-4">
                {users.map((u) => (
                    <div
                        key={u._id}
                        className="border p-4 rounded-lg shadow-sm bg-white flex justify-between items-center hover:shadow-md transition"
                    >
                        <div>
                            <p className="font-bold text-lg">{u.name}</p>
                            <p className="text-gray-600">{u.email}</p>
                            <p className="text-sm text-gray-500">
                                Role: <span className="font-medium">{u.role}</span>
                            </p>
                        </div>

                        <span
                            className={`px-3 py-1 text-sm rounded-full ${u.role === "admin"
                                ? "bg-purple-200 text-purple-700"
                                : "bg-gray-200 text-gray-700"
                                }`}
                        >
                            {u.role}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
