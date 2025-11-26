"use client";

import { useAuth } from "@/Context/AuthContext";
import Link from "next/link";

export default function AdminLayout({ children }) {
    const { user } = useAuth();

    if (!user || user.role !== "admin") {
        return (
            <div className="h-[60vh] flex flex-col items-center justify-center">
                <h2 className="text-xl font-semibold">Access Denied</h2>
                <p className="mb-4">Only admins can access this area.</p>

                <Link
                    href="/"
                    className="px-6 py-2 bg-purple-600 text-white rounded-xl"
                >
                    Go Home
                </Link>
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="flex gap-6 mb-10 border-b pb-4">
                <Link href="/admin" className="text-purple-600 font-semibold">
                    Dashboard
                </Link>
                <Link href="/admin/products/create">Create Product</Link>
                <Link href="/admin/users">Users</Link>
            </div>

            {children}
        </div>
    );
}
