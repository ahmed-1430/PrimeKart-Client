"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";

export default function EditProductPage() {
    const { id } = useParams();
    const [form, setForm] = useState(null);

    useEffect(() => {
        axios
            .get(`https://prime-kart-server.vercel.app/api/products/${id}`)
            .then((res) => setForm(res.data))
            .catch(() => toast.error("Failed to load product"));
    }, [id]);

    if (!form) return <p>Loading...</p>;

    const handleUpdate = async () => {
        try {
            await axios.put(`https://prime-kart-server.vercel.app/api/products/${id}`, form);
            toast.success("Product updated!");
        } catch {
            toast.error("Update failed");
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Edit Product</h1>

            <div className="grid gap-4">
                <input
                    className="border p-3 rounded"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                />

                <input
                    className="border p-3 rounded"
                    value={form.image}
                    onChange={(e) => setForm({ ...form, image: e.target.value })}
                />

                <input
                    className="border p-3 rounded"
                    value={form.price}
                    type="number"
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                />

                <input
                    className="border p-3 rounded"
                    value={form.stock}
                    type="number"
                    onChange={(e) => setForm({ ...form, stock: e.target.value })}
                />

                <input
                    className="border p-3 rounded"
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                />

                <textarea
                    className="border p-3 rounded h-32"
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                />

                <button
                    onClick={handleUpdate}
                    className="bg-purple-600 text-white p-3 rounded"
                >
                    Save Changes
                </button>
            </div>
        </div>
    );
}
