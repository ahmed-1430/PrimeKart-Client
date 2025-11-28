"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function UsersPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        async function loadUsers() {
            try {
                const token = localStorage.getItem("token");

                // ❌ Token missing → stop + redirect
                if (!token) {
                    toast.error("Unauthorized! Please login again.");
                    router.push("/login");
                    return;
                }

                // ✅ Fetch users with token
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

                // 401 or token expired
                if (err.response?.status === 401) {
                    toast.error("Session expired! Please login again.");
                    localStorage.removeItem("token");
                    router.push("/login");
                    return;
                }

                toast.error("Failed to load users.");
            } finally {
                setLoading(false);
            }
        }

        loadUsers();
    }, [router]);

    // LOADING UI
    if (loading) {
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
