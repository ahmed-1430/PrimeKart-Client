"use client";

import { useAuth } from "@/Context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminLayout({ children }) {
    const { user, loading } = useAuth();
    const router = useRouter();

    // Handle loading state
    useEffect(() => {
        if (!loading && (!user || user.role !== "admin")) {
            router.push("/"); 
        }
    }, [user, loading]);

    if (loading || !user) {
        return (
            <div className="h-[60vh] flex items-center justify-center text-xl">
                Checking admin access...
            </div>
        );
    }

    if (user.role !== "admin") {
        return (
            <div className="h-[60vh] flex flex-col items-center justify-center">
                <h2 className="text-xl font-semibold">Access Denied</h2>
                <p className="mb-4">Only administrators can access this area.</p>

                <Link
                    href="/"
                    className="px-6 py-2 bg-purple-600 text-white rounded-xl"
                >
                    Go Home
                </Link>
            </div>
        );
    }

    // Admin layout UI
    return (
        <div className="min-h-screen p-6 bg-gray-50">
            {/* NAVBAR */}
            <div className="flex gap-6 mb-10 pb-4 border-b text-lg font-medium">
                <Link href="/admin" className="text-purple-600">
                    Dashboard
                </Link>

                <Link href="/admin/products" className="hover:text-purple-600">
                    Products
                </Link>

                <Link href="/admin/products/create" className="hover:text-purple-600">
                    Add Product
                </Link>

                <Link href="/admin/orders" className="hover:text-purple-600">
                    Orders
                </Link>

                <Link href="/admin/users" className="hover:text-purple-600">
                    Users
                </Link>
            </div>

            {/* PAGE CONTENT */}
            {children}
        </div>
    );
}
