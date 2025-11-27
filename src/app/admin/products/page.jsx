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
            .get("http://localhost:3000/api/products")
            .then((res) => setProducts(res.data))
            .catch(() => setError("Failed to load products"))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="p-10 text-center text-xl font-semibold text-gray-600 animate-fadeIn">
                Loading products...
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-10 text-center text-red-600 text-xl animate-fadeIn">
                {error}
            </div>
        );
    }

    return (
        <div className="p-6 animate-fadeIn">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-bold text-dark">Products</h1>

                <Link
                    href="/admin/products/create"
                    className="bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-xl shadow-md transition-all"
                >
                    + Add Product
                </Link>
            </div>

            {/* Table Container */}
            <div className="overflow-x-auto rounded-xl shadow-lg bg-white border border-light">
                <table className="w-full">
                    <thead className="bg-light border-b border-gray-200">
                        <tr>
                            <th className="p-4 text-left font-semibold text-gray-700">Name</th>
                            <th className="p-4 text-left font-semibold text-gray-700">Price</th>
                            <th className="p-4 text-left font-semibold text-gray-700">Stock</th>
                            <th className="p-4 text-left font-semibold text-gray-700">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {products.length === 0 && (
                            <tr>
                                <td
                                    colSpan="4"
                                    className="p-6 text-center text-gray-500 text-lg"
                                >
                                    No products found.
                                </td>
                            </tr>
                        )}

                        {products.map((p) => (
                            <tr
                                key={p._id}
                                className="border-b hover:bg-gray-50 transition-all"
                            >
                                <td className="p-4 font-medium text-dark">{p.title}</td>
                                <td className="p-4 text-gray-700">${p.price}</td>
                                <td className="p-4 text-gray-700">{p.stock ?? "N/A"}</td>

                                <td className="p-4 flex gap-3">
                                    <Link
                                        href={`/admin/products/${p._id}`}
                                        className="px-4 py-1.5 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-all shadow"
                                    >
                                        View
                                    </Link>

                                    <Link
                                        href={`/admin/products/${p._id}?edit=true`}
                                        className="px-4 py-1.5 rounded-lg bg-green-500 text-white hover:bg-green-600 transition-all shadow"
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
