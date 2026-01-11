/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "@/Context/AuthContext";

export default function CreateProductPage() {
    const { token } = useAuth();
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
        if (!form.title.trim() || !form.price.trim()) {
            toast.error("Title & Price are required!");
            return;
        }

        if (!token) {
            toast.error("Unauthorized! Please login again.");
            return;
        }

        try {
            setLoading(true);

            await axios.post(
                "https://prime-kart-server.vercel.app/api/admin/products",
                form,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            toast.success("Product created successfully 🎉");

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
        <div className="relative min-h-screen">
            {/* background glow */}
            <div className="absolute inset-0 -z-10 bg-linear-to-br from-purple-900/20 via-pink-900/20 to-indigo-900/20 blur-3xl" />

            {/* HEADER */}
            <div className="w-11/12 mx-auto mb-10">
                <h1 className="text-4xl font-black bg-linear-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                    Add New Product
                </h1>
                <p className="text-slate-500 mt-2">
                    Create and publish a new product in your store
                </p>
            </div>

            {/* FORM */}
            <div className="max-w-11/12 mx-auto glass-panel">
                <div className="grid gap-6">
                    {/* TITLE */}
                    <Input
                        label="Product Title"
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        placeholder="Premium Headphones"
                    />

                    {/* IMAGE */}
                    <Input
                        label="Image URL"
                        name="image"
                        value={form.image}
                        onChange={handleChange}
                        placeholder="https://example.com/image.jpg"
                    />

                    {/* IMAGE PREVIEW */}
                    {form.image && (
                        <div className="rounded-xl overflow-hidden border border-white/10">
                            <img
                                src={form.image}
                                alt="Preview"
                                className="w-full h-56 object-cover"
                            />
                        </div>
                    )}

                    {/* PRICE + STOCK */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <Input
                            label="Price ($)"
                            name="price"
                            type="number"
                            value={form.price}
                            onChange={handleChange}
                            placeholder="199"
                        />

                        <Input
                            label="Stock Quantity"
                            name="stock"
                            type="number"
                            value={form.stock}
                            onChange={handleChange}
                            placeholder="50"
                        />
                    </div>

                    {/* CATEGORY */}
                    <Input
                        label="Category"
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        placeholder="Electronics"
                    />

                    {/* DESCRIPTION */}
                    <div>
                        <label className="block mb-2 text-sm font-medium text-slate-500">
                            Description
                        </label>
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            placeholder="Write a short product description..."
                            className="w-full h-32 px-4 py-3 rounded-xl
                            bg-white/10 backdrop-blur border border-slate-400/20
                            text-white outline-none resize-none
                            focus:ring-2 focus:ring-purple-500"
                        />
                    </div>

                    {/* SUBMIT */}
                    <button
                        disabled={loading}
                        onClick={handleSubmit}
                        className="mt-4 w-full py-3 rounded-xl
                        bg-linear-to-r from-purple-600 to-pink-600
                        text-white font-semibold text-lg
                        hover:scale-[1.02] transition
                        disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                        {loading ? "Creating Product..." : "Create Product"}
                    </button>
                </div>
            </div>
        </div>
    );
}

/* -------- REUSABLE INPUT -------- */

function Input({ label, ...props }) {
    return (
        <div>
            <label className="block mb-2 text-sm font-medium text-slate-500">
                {label}
            </label>
            <input
                {...props}
                className="w-full px-4 py-3 rounded-xl
                bg-white/10 backdrop-blur border border-slate-400/40
                text-slate-500 outline-none
                focus:ring-2 focus:ring-purple-500"
            />
        </div>
    );
}
