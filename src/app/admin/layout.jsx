"use client";

import { useAuth } from "@/Context/AuthContext";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminLayout({ children }) {
    const { user, loading } = useAuth();
    const pathname = usePathname() || "/";

    // ⏳ Wait for auth hydration
    if (loading) {
        return (
            <div className="h-[60vh] flex items-center justify-center text-xl">
                Checking admin access...
            </div>
        );
    }

    // ❌ Middleware already blocks non-admins
    // If somehow user is missing, just render nothing (avoid redirect loops)
    if (!user || user.role !== "admin") {
        return null;
    }

    // normalize path
    const normalize = (p) => {
        if (!p) return "/";
        if (p !== "/" && p.endsWith("/")) return p.slice(0, -1);
        return p;
    };

    const path = normalize(pathname);

    const isActive = (itemPath) => {
        const np = normalize(itemPath);

        if (np === "/admin") return path === "/admin";
        return path === np || path.startsWith(np + "/");
    };

    const activeClass =
        "bg-purple-400/20 text-purple-900 font-semibold rounded-xl px-4 py-2 shadow-md";
    const normalClass =
        "text-gray-700 hover:text-purple-700 hover:bg-purple-200/40 rounded-xl transition px-4 py-2";

    return (
        <div className="min-h-screen py-6 bg-gray-50">
            {/* NAVBAR */}
            <div className="flex gap-6 mb-10 pb-4 border-b text-lg font-medium w-11/12 mx-auto">
                <Link href="/admin" className={isActive("/admin") ? activeClass : normalClass}>
                    Dashboard
                </Link>

                <Link href="/admin/products" className={isActive("/admin/products") ? activeClass : normalClass}>
                    Products
                </Link>

                <Link
                    href="/admin/products/create"
                    className={isActive("/admin/products/create") ? activeClass : normalClass}
                >
                    Add Product
                </Link>

                <Link href="/admin/orders" className={isActive("/admin/orders") ? activeClass : normalClass}>
                    Orders
                </Link>

                <Link href="/admin/users" className={isActive("/admin/users") ? activeClass : normalClass}>
                    Users
                </Link>
            </div>

            {/* PAGE CONTENT */}
            <div className="w-11/12 mx-auto">{children}</div>
        </div>
    );
}
