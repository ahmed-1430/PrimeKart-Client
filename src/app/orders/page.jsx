/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useAuth } from "@/Context/AuthContext";

export default function OrdersPage() {
    const { user, loading, token } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loadingOrders, setLoadingOrders] = useState(true);

    const API = "https://prime-kart-server.vercel.app";

    // FETCH MY ORDERS
    const fetchOrders = async () => {
        try {
            if (!token || !user?.email) return;

            const res = await axios.get(`${API}/api/orders/${user.email}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setOrders(res.data);
        } catch (err) {
            // console.log("Failed to fetch orders:", err?.response?.data || err);
        } finally {
            setLoadingOrders(false);
        }
    };

    // RUN WHEN USER & TOKEN READY
    useEffect(() => {
        if (user && token) fetchOrders();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, token]);

    /* -----------------------------
       SESSION LOADING
    ------------------------------ */
    if (loading) {
        return (
            <div className="h-[60vh] flex flex-col items-center justify-center">
                <p className="text-xl animate-pulse text-purple-600">
                    Checking your session...
                </p>
            </div>
        );
    }

    /* -----------------------------
       NOT LOGGED IN
    ------------------------------ */
    if (!user) {
        return (
            <div className="h-[60vh] flex flex-col items-center justify-center">
                <p className="text-xl mb-4">You must be logged in to view your orders.</p>
                <Link
                    href="/login"
                    className="bg-purple-600 px-6 py-2 text-white rounded-xl shadow-lg hover:bg-purple-700 transition"
                >
                    Login
                </Link>
            </div>
        );
    }

    /* -----------------------------
       SKELETON LOADING
    ------------------------------ */
    if (loadingOrders) {
        return (
            <div className="w-11/12 mx-auto mt-12 space-y-8">
                {[1, 2, 3].map((_, i) => (
                    <div
                        key={i}
                        className="animate-pulse p-8 rounded-3xl bg-white/60 backdrop-blur-xl shadow-md"
                    >
                        <div className="h-6 bg-gray-300/60 w-1/3 rounded mb-4"></div>
                        <div className="h-4 bg-gray-300/60 w-1/4 rounded mb-6"></div>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="h-24 bg-gray-300/60 rounded-xl"></div>
                            <div className="h-24 bg-gray-300/60 rounded-xl"></div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    /* -----------------------------
       NO ORDERS
    ------------------------------ */
    if (orders.length === 0) {
        return (
            <div className="h-[60vh] flex flex-col items-center justify-center text-center">
                <p className="text-2xl mb-4 font-semibold text-gray-700">
                    You have not placed any orders yet.
                </p>
                <Link
                    href="/products"
                    className="bg-purple-600 px-6 py-3 text-white text-lg rounded-xl shadow-lg hover:bg-purple-700 transition"
                >
                    Browse Products
                </Link>
            </div>
        );
    }

    /* -----------------------------
       ORDER LIST
    ------------------------------ */
    return (
        <div className="w-11/12 mx-auto p-4 mt-10">
            <h2 className="text-4xl font-extrabold text-center mb-12 bg-linear-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                Your Orders
            </h2>

            <div className="space-y-12">
                {orders.map((order) => (
                    <div
                        key={order._id}
                        className="p-8 rounded-3xl bg-white/70 backdrop-blur-xl border border-white/30 shadow-[0_8px_30px_rgba(0,0,0,0.1)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.15)] transition-all duration-300"
                    >
                        {/* Header */}
                        <div className="flex justify-between items-center mb-6">
                            <p className="text-lg font-semibold text-gray-800">
                                Order ID:{" "}
                                <span className="text-purple-700">{order._id}</span>
                            </p>

                            <span
                                className={`px-4 py-1 rounded-full text-sm font-medium ${order.status === "Pending"
                                        ? "bg-yellow-200 text-yellow-800 animate-pulse"
                                        : "bg-green-200 text-green-700"
                                    }`}
                            >
                                {order.status}
                            </span>
                        </div>

                        <p className="text-gray-600 text-sm mb-6">
                            Placed on: {new Date(order.createdAt).toLocaleString()}
                        </p>

                        {/* Items */}
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {order.items.map((item, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-center gap-5 p-4 rounded-2xl bg-white shadow-sm border hover:shadow-md hover:scale-[1.02] transition-all"
                                >
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-20 h-20 rounded-xl object-cover border"
                                    />

                                    <div className="flex-1">
                                        <p className="font-semibold text-gray-900">
                                            {item.title}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            Qty: {item.quantity}
                                        </p>
                                        <p className="font-bold text-purple-700 mt-1">
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Footer */}
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-8 gap-4">
                            <p className="text-2xl font-bold">
                                Total:{" "}
                                <span className="text-purple-700">
                                    ${order.total.toFixed(2)}
                                </span>
                            </p>

                            <div className="flex gap-4">
                                <Link
                                    href={`/orders/${order._id}`}
                                    className="px-5 py-2 border border-purple-600 text-purple-600 rounded-xl hover:bg-purple-600 hover:text-white transition shadow-sm"
                                >
                                    View Details
                                </Link>

                                <button className="px-5 py-2 bg-purple-600 text-white rounded-xl shadow-md hover:bg-purple-700 transition">
                                    Re-order
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
