"use client";

import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function CreateProductPage() {
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        title: "",
        price: "",
        stock: "",
        category: "",
        image: "",
        description: "",
    });

    const handleSubmit = async () => {
        if (!form.title || !form.price) {
            toast.error("Title and Price are required!");
            return;
        }

        try {
            setLoading(true);

            const token = localStorage.getItem("token");

            const res = await axios.post(
                "http://localhost:3000/api/admin/products",
                form,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            );

            toast.success("Product created successfully!");

            // Reset fields
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
            <h1 className="text-4xl font-bold mb-8 text-dark">Create Product</h1>

            <div className="bg-white shadow-xl rounded-2xl p-6 border border-light">
                <div className="grid gap-5">

                    <input
                        className="border p-3 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                        placeholder="Product Title"
                        value={form.title}
                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                    />

                    <input
                        className="border p-3 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                        placeholder="Image URL"
                        value={form.image}
                        onChange={(e) => setForm({ ...form, image: e.target.value })}
                    />

                    <input
                        className="border p-3 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                        placeholder="Price"
                        type="number"
                        value={form.price}
                        onChange={(e) => setForm({ ...form, price: e.target.value })}
                    />

                    <input
                        className="border p-3 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                        placeholder="Stock"
                        type="number"
                        value={form.stock}
                        onChange={(e) => setForm({ ...form, stock: e.target.value })}
                    />

                    <input
                        className="border p-3 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                        placeholder="Category"
                        value={form.category}
                        onChange={(e) => setForm({ ...form, category: e.target.value })}
                    />

                    <textarea
                        className="border p-3 rounded-lg focus:ring-2 focus:ring-primary outline-none h-36"
                        placeholder="Description"
                        value={form.description}
                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                    ></textarea>

                    <button
                        disabled={loading}
                        onClick={handleSubmit}
                        className="bg-primary hover:bg-primary-dark text-white p-3 rounded-xl font-semibold shadow-md transition disabled:opacity-50"
                    >
                        {loading ? "Creating..." : "Create Product"}
                    </button>

                </div>
            </div>
        </div>
    );
}
