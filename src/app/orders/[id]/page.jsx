/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/Context/AuthContext";
import Link from "next/link";
import axios from "axios";

export default function OrderDetailsPage() {
    const { id } = useParams();
    const router = useRouter();
    const { user, token, loading } = useAuth();

    const [order, setOrder] = useState(null);
    const [loadingOrder, setLoadingOrder] = useState(true);

    const API = "https://prime-kart-server.vercel.app";

    const fetchOrder = async () => {
        try {
            if (!token) return;

            const res = await axios.get(`${API}/api/orders/details/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setOrder(res.data);
        } catch (err) {
            // console.log("Failed to load order:", err);
        } finally {
            setLoadingOrder(false);
        }
    };

    useEffect(() => {
        if (user && token) {
            fetchOrder();
        }
    }, [user, token]);

    if (loading) {
        return (
            <p className="text-center py-10 text-lg animate-pulse text-purple-600">
                Checking your session...
            </p>
        );
    }

    if (!user) {
        return (
            <div className="h-[60vh] flex flex-col items-center justify-center">
                <p className="text-xl mb-4">You must be logged in.</p>
                <Link
                    href="/login"
                    className="bg-purple-600 px-6 py-2 text-white rounded-xl shadow-lg hover:bg-purple-700 transition"
                >
                    Login
                </Link>
            </div>
        );
    }

    if (loadingOrder) {
        return (
            <p className="text-center py-10 text-lg animate-pulse text-purple-600">
                Loading order details...
            </p>
        );
    }

    if (!order) {
        return (
            <div className="h-[60vh] flex flex-col items-center justify-center">
                <p className="text-xl mb-4 text-red-500">Order not found.</p>
                <Link
                    href="/my-orders"
                    className="bg-purple-600 px-6 py-2 text-white rounded-xl shadow-lg hover:bg-purple-700 transition"
                >
                    Back to Orders
                </Link>
            </div>
        );
    }

    return (
        <div className="w-11/12 mx-auto py-10">
            <Link href="/my-orders" className="text-purple-600 underline mb-4 inline-block">
                ← Back to Orders
            </Link>

            <h1 className="text-4xl font-extrabold mb-8 bg-linear-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                Order Details
            </h1>

            {/* ORDER INFO CARD */}
            <div className="p-8 rounded-3xl bg-white/70 backdrop-blur-xl border border-white/40 shadow-xl">

                {/* ID + STATUS */}
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-800">
                        Order ID: <span className="text-purple-700">{order._id}</span>
                    </h2>

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

                <p className="text-gray-600 mt-2 mb-6">
                    Placed on: {new Date(order.createdAt).toLocaleString()}
                </p>

                {/* CUSTOMER INFO */}
                <div className="bg-white p-5 rounded-2xl border shadow-sm mb-6">
                    <h3 className="text-xl font-semibold text-purple-700 mb-3">Customer Information</h3>

                    <p><strong>Name:</strong> {order.customer?.name}</p>
                    <p><strong>Email:</strong> {order.customer?.email}</p>
                    <p><strong>Phone:</strong> {order.customer?.phone}</p>
                </div>

                {/* ADDRESS */}
                <div className="bg-white p-5 rounded-2xl border shadow-sm mb-6">
                    <h3 className="text-xl font-semibold text-purple-700 mb-3">Delivery Address</h3>
                    <p className="text-gray-700">{order.address}</p>
                </div>

                {/* ITEMS LIST */}
                <div className="bg-white p-6 rounded-2xl border shadow-sm">
                    <h3 className="text-2xl font-bold mb-4 text-purple-700">Items</h3>

                    <div className="space-y-5">
                        {order.items.map((item, idx) => (
                            <div
                                key={idx}
                                className="flex items-center gap-5 p-4 rounded-2xl bg-white shadow border hover:shadow-md transition"
                            >
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-20 h-20 rounded-xl border object-cover"
                                />

                                <div className="flex-1">
                                    <p className="font-semibold">{item.title}</p>
                                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                </div>

                                <p className="font-bold text-purple-700">
                                    ${(item.price * item.quantity).toFixed(2)}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* TOTAL */}
                    <div className="flex justify-between items-center mt-6 text-xl font-bold">
                        <p>Total:</p>
                        <p className="text-purple-700">${order.total.toFixed(2)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
