"use client";

import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "@/Context/AuthContext";

export default function CreateProductPage() {
    const { token } = useAuth(); // always use context token (much safer)
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        title: "",
        price: "",
        stock: "",
        category: "",
        image: "",
        description: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        // Validate required fields
        if (!form.title.trim() || !form.price.trim()) {
            toast.error("Title & Price are required!");
            return;
        }

        // Ensure admin is logged in
        if (!token) {
            toast.error("Unauthorized! Please login again.");
            return;
        }

        try {
            setLoading(true);

            const res = await axios.post(
                "https://prime-kart-server.vercel.app/api/admin/products",
                form,
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // correct token
                    },
                }
            );

            toast.success("Product created successfully 🎉");

            // Reset form
            setForm({
                title: "",
                price: "",
                stock: "",
                category: "",
                image: "",
                description: "",
            });

        } catch (err) {
            toast.error(
                err?.response?.data?.message || "Failed to create product"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6 animate-fadeIn">
            <h1 className="text-4xl font-bold mb-8 text-dark">
                Add New Product
            </h1>

            <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-200">

                <div className="grid gap-5">

                    {/* Title */}
                    <input
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        placeholder="Product Title"
                        className="border p-3 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                    />

                    {/* Image */}
                    <input
                        name="image"
                        value={form.image}
                        onChange={handleChange}
                        placeholder="Image URL"
                        className="border p-3 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                    />

                    {/* Price */}
                    <input
                        name="price"
                        type="number"
                        value={form.price}
                        onChange={handleChange}
                        placeholder="Price"
                        className="border p-3 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                    />

                    {/* Stock */}
                    <input
                        name="stock"
                        type="number"
                        value={form.stock}
                        onChange={handleChange}
                        placeholder="Stock Quantity"
                        className="border p-3 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                    />

                    {/* Category */}
                    <input
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        placeholder="Category"
                        className="border p-3 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                    />

                    {/* Description */}
                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        placeholder="Description"
                        className="border p-3 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none h-32"
                    />

                    {/* Button */}
                    <button
                        disabled={loading}
                        onClick={handleSubmit}
                        className="bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-xl font-semibold shadow-md transition disabled:opacity-50"
                    >
                        {loading ? "Please wait..." : "Create Product"}
                    </button>
                </div>

            </div>
        </div>
    );
}
