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
                const res = await axios.get(
                    "https://prime-kart-server.vercel.app/api/admin/summary"
                );
                setSummary(res.data);
            } catch (err) { }
            setLoading(false);
        }

        if (user?.role === "admin") loadSummary();
    }, [user]);

    if (!user || user.role !== "admin") {
        return (
            <div className="h-[70vh] flex flex-col gap-4 items-center justify-center text-center">
                <h2 className="text-3xl font-bold text-red-400">Access Denied</h2>
                <p className="text-gray-400">Admins only</p>
                <Link
                    href="/"
                    className="px-6 py-2 rounded-xl bg-purple-600/80 backdrop-blur text-white hover:scale-105 transition"
                >
                    Go Home
                </Link>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="h-[60vh] flex items-center justify-center">
                <div className="animate-spin h-10 w-10 rounded-full border-4 border-purple-500 border-t-transparent" />
            </div>
        );
    }

    return (
        <div className="relative min-h-screen">
            {/* background glow */}
            <div className="absolute inset-0 -z-10 bg-linear-to-br from-purple-900/20 via-pink-900/20 to-indigo-900/20 blur-3xl" />

            {/* HEADER */}
            <div className="mb-10">
                <h1 className="text-4xl font-black bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Admin Dashboard
                </h1>
                <p className="text-gray-400 mt-2">
                    Real-time overview of PrimeKart performance
                </p>
            </div>

            {/* STATS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <GlassCard label="Total Products" value={summary.products} />
                <GlassCard label="Total Users" value={summary.users} />
                <GlassCard label="Total Orders" value={summary.orders} />
                <GlassCard
                    label="Pending Orders"
                    value={summary.pending}
                    highlight
                />
            </div>

            {/* RECENT ORDERS */}
            <div className="mt-14">
                <h2 className="text-2xl font-bold text-slate-400 mb-4">
                    Recent Orders
                </h2>

                <div className="glass-panel overflow-x-auto">
                    <table className="w-full min-w-[700px] text-left">
                        <thead>
                            <tr className="border-b border-white/10 text-gray-500">
                                <th className="p-4">Order</th>
                                <th className="p-4">Customer</th>
                                <th className="p-4">Total</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">Date</th>
                            </tr>
                        </thead>

                        <tbody>
                            {summary.recentOrders.map((order) => (
                                <tr
                                    key={order._id}
                                    className="border-b border-white/5 hover:bg-white/5 transition"
                                >
                                    <td className="p-4 font-mono">
                                        #{order._id.slice(-6)}
                                    </td>
                                    <td className="p-4">
                                        {order.customer.name}
                                    </td>
                                    <td className="p-4 font-bold text-purple-400">
                                        ${order.total}
                                    </td>
                                    <td className="p-4">
                                        <StatusBadge status={order.status} />
                                    </td>
                                    <td className="p-4 text-gray-400">
                                        {new Date(
                                            order.createdAt
                                        ).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

/* --------- COMPONENTS --------- */

function GlassCard({ label, value, highlight }) {
    return (
        <div
            className={`glass-panel hover:scale-[1.03] transition ${highlight ? "ring-1 ring-yellow-400/40" : ""
                }`}
        >
            <p className="text-gray-500 text-sm">{label}</p>
            <h3 className="text-4xl font-extrabold mt-2 bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {value}
            </h3>
        </div>
    );
}

function StatusBadge({ status }) {
    const base =
        "px-3 py-1 rounded-full text-sm font-semibold backdrop-blur";
    if (status === "Pending") {
        return (
            <span
                className={`${base} bg-blue-300/20 text-blue-400 border border-blue-300/50`}
            >
                Pending
            </span>
        );
    }
    return (
        <span
            className={`${base} bg-green-400/20 text-green-500 border border-green-400/30`}
        >
            Completed
        </span>
    );
}
