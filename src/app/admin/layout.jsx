"use client";

import Link from "next/link";
import { useAuth } from "@/Context/AuthContext";

export default function AdminLayout({ children }) {
    const { user } = useAuth();

    // Allow only admin
    if (user?.role !== "admin") {
        return (
            <div className="h-screen flex items-center justify-center text-red-600 text-xl">
                 Access Denied — Admin Only
            </div>
        );
    }

    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-900 text-white p-5 space-y-6">
                <h2 className="text-2xl font-bold">Admin Panel</h2>

                <nav className="flex flex-col space-y-3">
                    <Link href="/admin">Dashboard</Link>
                    <Link href="/admin/products">Products</Link>
                    <Link href="/admin/orders">Orders</Link>
                    <Link href="/admin/users">Users</Link>
                </nav>
            </aside>

            {/* Main Dashboard Content */}
            <main className="flex-1 p-10 bg-gray-100">{children}</main>
        </div>
    );
}
