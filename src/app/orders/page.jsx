/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useAuth } from "@/Context/AuthContext";

export default function OrdersPage() {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) return;

        async function fetchOrders() {
            try {
                const res = await axios.get(`http://localhost:3000/api/orders/${user.email}`);
                setOrders(res.data);
            } catch (err) {
                console.log("Error fetching orders", err);
            } finally {
                setLoading(false);
            }
        }

        fetchOrders();
    }, [user]);

    // NOT LOGGED IN
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

    // LOADING
    if (loading) {
        return (
            <p className="text-center py-10 text-lg animate-pulse text-purple-600">
                Loading your orders...
            </p>
        );
    }

    // EMPTY
    if (orders.length === 0) {
        return (
            <div className="h-[60vh] flex flex-col items-center justify-center">
                <p className="text-xl mb-4">No orders found.</p>
                <Link href="/" className="bg-purple-600 px-6 py-2 text-white rounded-xl shadow-lg hover:bg-purple-700 transition">Shop Now</Link>
            </div>
        );
    }

    return (
        <div className="w-11/12 mx-auto p-4 mt-10">

            {/* PAGE TITLE */}
            <h2 className="text-4xl font-extrabold text-center mb-12 bg-linear-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                Your Orders
            </h2>

            <div className="space-y-10">
                {orders.map((order) => (
                    <div
                        key={order._id}
                        className="p-8 rounded-3xl bg-white/60 backdrop-blur-xl border border-white/40 shadow-[0_8px_30px_rgba(0,0,0,0.1)]
                        hover:shadow-[0_10px_40px_rgba(0,0,0,0.15)] transition-all duration-300"
                    >
                        {/* ORDER HEADER */}
                        <div className="flex justify-between items-center mb-4">
                            <p className="text-lg font-semibold text-gray-800">
                                Order ID: <span className="text-purple-700">{order._id}</span>
                            </p>

                            <span
                                className={`px-4 py-1 rounded-full text-sm font-medium 
                                    ${order.status === "Pending"
                                        ? "bg-yellow-200 text-yellow-800 animate-pulse"
                                        : "bg-green-200 text-green-700"
                                    }`}
                            >
                                {order.status}
                            </span>
                        </div>

                        {/* DATE */}
                        <p className="text-gray-600 text-sm mb-6">
                            Placed on: {new Date(order.createdAt).toLocaleString()}
                        </p>

                        {/* ITEMS GRID */}
                        <div className="grid sm:grid-cols-2 gap-6">
                            {order.items.map((item, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-center gap-5 p-4 rounded-2xl bg-white shadow-sm border 
                                    hover:shadow-md hover:scale-[1.01] transition-all"
                                >
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-20 h-20 rounded-xl object-cover border"
                                    />
                                    <div className="flex-1">
                                        <p className="font-semibold text-gray-900">{item.title}</p>
                                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                        <p className="font-bold text-purple-700 mt-1">
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* TOTAL + BUTTONS */}
                        <div className="flex justify-between items-center mt-8">
                            <p className="text-2xl font-bold">
                                Total:{" "}
                                <span className="text-purple-700">${order.total.toFixed(2)}</span>
                            </p>

                            <div className="flex gap-4">
                                <button className="px-5 py-2 border border-purple-600 text-purple-600 rounded-xl 
                                    hover:bg-purple-600 hover:text-white transition shadow-sm">
                                    View Details
                                </button>

                                <button className="px-5 py-2 bg-purple-600 text-white rounded-xl shadow-md 
                                    hover:bg-purple-700 transition">
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
