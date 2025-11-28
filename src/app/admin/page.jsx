"use client";

import { useAuth } from "@/Context/AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function AdminDashboard() {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [summary, setSummary] = useState(null);

    useEffect(() => {
        async function loadSummary() {
            try {
                const res = await axios.get("https://prime-kart-server.vercel.app/api/admin/summary");
                setSummary(res.data);
            } catch (err) {
                console.log("Summary error:", err);
            }
            setLoading(false);
        }

        if (user?.role === "admin") loadSummary();
    }, [user]);

    if (!user || user.role !== "admin") {
        return (
            <div className="h-[70vh] flex flex-col gap-4 items-center justify-center text-center">
                <h2 className="text-2xl font-bold text-red-500">Access Denied</h2>
                <p className="text-gray-600">Only Admins can access this dashboard.</p>
                <Link href="/" className="px-6 py-2 rounded-xl bg-purple-600 text-white">
                    Go Home
                </Link>
            </div>
        );
    }

    if (loading)
        return (
            <div className="h-[60vh] flex items-center justify-center">
                <div className="animate-spin h-10 w-10 rounded-full border-4 border-purple-500 border-t-transparent"></div>
            </div>
        );

    return (
        <div className="p-6">
            {/* DASHBOARD HEADER */}
            <h1 className="text-3xl font-extrabold bg-linear-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                Admin Dashboard
            </h1>
            <p className="text-gray-500 mt-1">Overview of your store performance</p>

            {/* STAT CARDS */}
            <div className="grid md:grid-cols-4 gap-6 mt-8">
                <Card label="Total Products" value={summary.products} />
                <Card label="Total Users" value={summary.users} />
                <Card label="Total Orders" value={summary.orders} />
                <Card label="Pending Orders" value={summary.pending} highlight />
            </div>

            {/* RECENT ORDERS */}
            <div className="mt-10">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Orders</h2>

                <div className="bg-white rounded-2xl shadow-md p-4 overflow-x-auto">
                    <table className="w-full text-left min-w-[600px]">
                        <thead>
                            <tr className="border-b">
                                <th className="p-3">Order ID</th>
                                <th className="p-3">Customer</th>
                                <th className="p-3">Total</th>
                                <th className="p-3">Status</th>
                                <th className="p-3">Date</th>
                            </tr>
                        </thead>

                        <tbody>
                            {summary.recentOrders.map((order) => (
                                <tr key={order._id} className="border-b hover:bg-gray-50">
                                    <td className="p-3">{order._id.slice(-6)}</td>
                                    <td className="p-3">{order.customer.name}</td>
                                    <td className="p-3 font-bold text-purple-600">${order.total}</td>
                                    <td className="p-3">
                                        <span
                                            className={`px-3 py-1 rounded-full text-sm ${order.status === "Pending"
                                                    ? "bg-yellow-200 text-yellow-800"
                                                    : "bg-green-200 text-green-800"
                                                }`}
                                        >
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="p-3">{new Date(order.createdAt).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

/* Reusable beautiful card */
function Card({ label, value, highlight }) {
    return (
        <div
            className={`p-6 rounded-2xl shadow-md bg-white border ${highlight ? "border-yellow-400" : "border-gray-200"
                } hover:shadow-xl transition-all`}
        >
            <p className="text-gray-500 font-medium">{label}</p>
            <h3 className="text-3xl font-bold mt-2 text-purple-600">{value}</h3>
        </div>
    );
}
