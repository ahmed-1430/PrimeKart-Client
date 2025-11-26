/* eslint-disable react-hooks/immutability */
"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalOrders: 0,
        totalProducts: 0,
        revenue: 0
    });

    useEffect(() => {
        loadStats();
    }, []);

    const loadStats = async () => {
        try {
            const [usersRes, ordersRes, productsRes] = await Promise.all([
                axios.get("http://localhost:3000/api/admin/users"),
                axios.get("http://localhost:3000/api/admin/orders"),
                axios.get("http://localhost:3000/api/products")
            ]);

            const orders = ordersRes.data;

            setStats({
                totalUsers: usersRes.data.length,
                totalOrders: orders.length,
                totalProducts: productsRes.data.length,
                revenue: orders.reduce((sum, o) => sum + o.total, 0)
            });

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

                {[
                    { label: "Users", value: stats.totalUsers, color: "blue" },
                    { label: "Products", value: stats.totalProducts, color: "purple" },
                    { label: "Orders", value: stats.totalOrders, color: "green" },
                    { label: "Revenue", value: `$${stats.revenue}`, color: "yellow" },
                ].map((box, i) => (
                    <div
                        key={i}
                        className="p-6 bg-white shadow rounded-xl border hover:shadow-lg transition"
                    >
                        <p className="text-gray-500">{box.label}</p>
                        <p className={`text-3xl font-bold text-${box.color}-600 mt-2`}>
                            {box.value}
                        </p>
                    </div>
                ))}

            </div>
        </div>
    );
}
