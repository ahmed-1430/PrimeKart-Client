/* eslint-disable @next/next/no-img-element */
"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

export default function OrderDetailsPage() {
    const { id } = useParams();
    const [order, setOrder] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:3000/api/orders/single/${id}`).then((res) => {
            setOrder(res.data);
        });
    }, [id]);

    if (!order) return <p>Loading order...</p>;

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-4">
                Order #{order._id.substring(0, 8)}
            </h1>

            <p className="mb-2">Customer: {order.email}</p>
            <p className="mb-2">Total: ${order.total}</p>
            <p className="mb-6">Status: {order.status}</p>

            <div className="space-y-4">
                {order.items.map((item) => (
                    <div
                        key={item._id}
                        className="flex items-center gap-4 border p-4 rounded"
                    >
                        <img src={item.image} alt="product image" className="w-20 h-20 object-cover" />
                        <div>
                            <p className="font-bold">{item.title}</p>
                            <p>Qty: {item.quantity}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
