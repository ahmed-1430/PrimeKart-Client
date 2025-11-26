"use client";

import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function CreateProductPage() {
    const [form, setForm] = useState({
        name: "",
        price: "",
        stock: "",
        category: "",
        image: "",
        description: "",
    });

    const handleSubmit = async () => {
        try {
            await axios.post("http://localhost:3000/api/products", form);

            toast.success("Product created!");
            setForm({
                name: "",
                price: "",
                stock: "",
                category: "",
                image: "",
                description: "",
            });
        } catch (err) {
            toast.error("Failed to create product");
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Create Product</h1>

            <div className="grid gap-4">
                <input
                    className="border p-3 rounded"
                    placeholder="Product Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                />

                <input
                    className="border p-3 rounded"
                    placeholder="Image URL"
                    value={form.image}
                    onChange={(e) => setForm({ ...form, image: e.target.value })}
                />

                <input
                    className="border p-3 rounded"
                    placeholder="Price"
                    type="number"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                />

                <input
                    className="border p-3 rounded"
                    placeholder="Stock"
                    type="number"
                    value={form.stock}
                    onChange={(e) => setForm({ ...form, stock: e.target.value })}
                />

                <input
                    className="border p-3 rounded"
                    placeholder="Category"
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                />

                <textarea
                    className="border p-3 rounded h-32"
                    placeholder="Description"
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                ></textarea>

                <button
                    onClick={handleSubmit}
                    className="bg-purple-600 text-white p-3 rounded"
                >
                    Create Product
                </button>
            </div>
        </div>
    );
}
