"use client";

import { useAuth } from "@/Context/AuthContext";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export default function AdminLayout({ children }) {
    const { user, loading } = useAuth();
    const router = useRouter();
    const pathname = usePathname() || "/";

    // Redirect non-admin users once auth finished loading
    useEffect(() => {
        if (!loading) {
            if (!user || user.role !== "admin") {
                router.push("/");
            }
        }
    }, [user, loading, router]);

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

                <Link href="/" className="px-6 py-2 bg-purple-600 text-white rounded-xl">
                    Go Home
                </Link>
            </div>
        );
    }

    // Normalize path: remove trailing slash except root
    const normalize = (p) => {
        if (!p) return "/";
        if (p !== "/" && p.endsWith("/")) return p.slice(0, -1);
        return p;
    };
    const path = normalize(pathname);

    // active logic:
    // - dashboard ('/admin') should be active ONLY when path === '/admin'
    // - other items active when equal OR when path startsWith(item + '/')
    const isActive = (itemPath) => {
        const np = normalize(itemPath);

        if (np === "/admin") {
            return path === "/admin";
        }

        return path === np || path.startsWith(np + "/");
    };

    const activeClass =
        "bg-purple-400/20 text-purple-900 font-semibold rounded-xl px-4 py-2 shadow-md";
    const normalClass = "text-gray-700 hover:text-purple-700 hover:bg-purple-200/40 rounded-xl transition px-4 py-2";

    return (
        <div className="min-h-screen py-6 bg-gray-50">
            {/* NAVBAR */}
            <div className="flex gap-6 mb-10 pb-4 border-b text-lg font-medium w-11/12 mx-auto">
                <Link href="/admin" className={isActive("/admin") ? activeClass : normalClass}>
                    Dashboard
                </Link>

                <Link
                    href="/admin/products"
                    className={isActive("/admin/products") ? activeClass : normalClass}
                >
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
