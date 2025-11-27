"use client";

import { useCart } from "@/Context/CartContext";
import { useAuth } from "@/Context/AuthContext";
import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const { cart } = useCart();
  const { user, logout } = useAuth();

  const pathname = usePathname();
  const router = useRouter();

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const defaultMenu = [
    { path: "/", label: "Home" },
    { path: "/products", label: "Products" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
  ];

  // Logged-in user items
  const userMenu = user
    ? [
        { path: "/my-orders", label: "My Orders" },
        { path: "/profile", label: "Profile" },
      ]
    : [];

  // Admin-only menu
  const adminMenu =
    user && user.role === "admin"
      ? [{ path: "/admin/dashboard", label: "Dashboard" }]
      : [];

  // Helper for active route styling
  const isActive = (path) =>
    pathname === path
      ? "bg-purple-700 text-white/05 rounded-xl px-4 py-2 shadow-lg"
      : "text-purple-700 hover:text-purple-900 transition";

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <nav className="backdrop-blur-xl bg-white/10 border-b border-white/20 sticky top-0 z-50 shadow-lg">
      <div className="w-11/12 mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-3xl font-extrabold bg-linear-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent cursor-pointer">
          PrimeKart
        </h1>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex gap-8 text-white font-medium items-center">
          {[...defaultMenu, ...userMenu, ...adminMenu].map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`px-3 py-2  ${isActive(item.path)}`}
            >
              {item.label}
            </Link>
          ))}

          {/* CART */}
          <Link href="/cart" className="relative text-3xl hover:scale-110 transition">
            🛒
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs px-2 py-0.5 rounded-full shadow-md">
                {cartCount}
              </span>
            )}
          </Link>

          {user ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 px-5 py-2 rounded-lg text-white font-semibold shadow-lg hover:bg-red-600 transition-all"
            >
              Logout
            </button>
          ) : (
            <Link
              href="/login"
              className="bg-linear-to-r from-purple-500 to-purple-700 px-5 py-2 rounded-lg text-white font-semibold shadow-lg hover:-translate-y-1 transition-all"
            >
              Login
            </Link>
          )}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden text-purple-700 text-3xl"
          onClick={() => setOpen(!open)}
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`md:hidden bg-black/40 backdrop-blur-xl border-t border-white/20 px-6 text-white transition-all duration-300 overflow-hidden ${
          open ? "max-h-[500px] opacity-100 pb-4" : "max-h-0 opacity-0 pb-0"
        }`}
      >
        {[...defaultMenu, ...userMenu, ...adminMenu].map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`block py-3 text-lg ${
              pathname === item.path ? "text-purple-400 font-bold" : "text-purple-300"
            }`}
          >
            {item.label}
          </Link>
        ))}

        {/* Cart */}
        <Link href="/cart" className="block py-3 text-lg">
          🛒 Cart
          {cartCount > 0 && (
            <span className="ml-2 bg-purple-600 text-white text-xs px-2 py-0.5 rounded-full">
              {cartCount}
            </span>
          )}
        </Link>

        {user ? (
          <button
            onClick={handleLogout}
            className="block py-3 text-red-300 font-semibold text-lg"
          >
            Logout
          </button>
        ) : (
          <Link href="/login" className="block py-3 text-purple-300 font-semibold text-lg">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
