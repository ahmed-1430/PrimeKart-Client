"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function AdminProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        axios
            .get("https://prime-kart-server.vercel.app/api/products")
            .then((res) => setProducts(res.data))
            .catch(() => setError("Failed to load products"))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="h-[60vh] flex items-center justify-center">
                <div className="animate-spin h-10 w-10 rounded-full border-4 border-purple-500 border-t-transparent" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-10 text-center text-red-400 text-xl">
                {error}
            </div>
        );
    }

    return (
        <div className="relative min-h-screen">
            {/* background glow */}
            <div className="absolute inset-0 -z-10 bg-linear-to-br from-indigo-900/20 via-purple-900/20 to-pink-900/20 blur-3xl" />

            {/* HEADER */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
                <div>
                    <h1 className="text-4xl font-black bg-linear-to-r from-purple-500 to-pink-400 bg-clip-text text-transparent">
                        Products
                    </h1>
                    <p className="text-gray-500 mt-1">
                        Manage all products in your store
                    </p>
                </div>

                <Link
                    href="/admin/products/create"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl
                    bg-linear-to-r from-purple-600 to-pink-600
                    text-white font-semibold shadow-lg
                    hover:scale-105 transition"
                >
                    + Add Product
                </Link>
            </div>

            {/* TABLE */}
            <div className="glass-panel overflow-x-auto">
                <table className="w-full min-w-[700px]">
                    <thead>
                        <tr className="border-b border-white/10 text-gray-500">
                            <th className="p-4 text-left">Product</th>
                            <th className="p-4 text-left">Price</th>
                            <th className="p-4 text-left">Stock</th>
                            <th className="p-4 text-left">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {products.length === 0 && (
                            <tr>
                                <td
                                    colSpan="4"
                                    className="p-8 text-center text-gray-500"
                                >
                                    No products found
                                </td>
                            </tr>
                        )}

                        {products.map((p) => (
                            <tr
                                key={p._id}
                                className="border-b border-white/5 hover:bg-white/5 transition"
                            >
                                <td className="p-4 font-medium text-slate-500">
                                    {p.title}
                                </td>

                                <td className="p-4 text-slate-500 font-semibold">
                                    ${p.price}
                                </td>

                                <td className="p-4 text-slate-500">
                                    {p.stock ?? "N/A"}
                                </td>

                                <td className="p-4 flex gap-3">
                                    <Link
                                        href={`/admin/products/${p._id}`}
                                        className="px-4 py-1.5 rounded-lg
                                        bg-blue-500 backdrop-blur
                                        text-white text-sm
                                        hover:bg-blue-500/80 transition"
                                    >
                                        View
                                    </Link>

                                    <Link
                                        href={`/admin/products/${p._id}?edit=true`}
                                        className="px-4 py-1.5 rounded-lg
                                        bg-green-500 backdrop-blur
                                        text-white text-sm
                                        hover:bg-green-500/80 transition"
                                    >
                                        Edit
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
