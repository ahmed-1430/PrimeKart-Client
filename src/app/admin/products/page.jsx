"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function AdminProducts() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3000/api/products")
            .then(res => setProducts(res.data))
            .catch(err => console.log(err));
    }, []);

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Products</h1>
                <Link href="/admin/products/create" className="bg-purple-600 text-white px-4 py-2 rounded">
                    Add Product
                </Link>
            </div>

            <table className="w-full bg-white shadow rounded-xl overflow-hidden">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="p-3 text-left">Name</th>
                        <th className="p-3 text-left">Price</th>
                        <th className="p-3 text-left">Stock</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((p) => (
                        <tr key={p._id} className="border-b">
                            <td className="p-3">{p.name}</td>
                            <td className="p-3">${p.price}</td>
                            <td className="p-3">{p.stock}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
