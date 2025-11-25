'use client';

import { useCart } from "@/Context/CartContext";
import { useAuth } from "@/Context/AuthContext";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const { cart } = useCart();
  const { user, logout } = useAuth(); 

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="backdrop-blur-xl bg-white/10 border-b border-white/20 sticky top-0 z-50 shadow-lg">
      <div className="w-11/12 mx-auto px-4 py-4 flex justify-between items-center">

        {/* LOGO */}
        <h1 className="text-3xl font-extrabold bg-linear-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent cursor-pointer">
          PrimeKart
        </h1>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex gap-8 text-white font-medium items-center">

          {["/", "/products", "/about", "/contact"].map((path, i) => (
            <Link
              key={i}
              href={path}
              className="hover:text-purple-800 text-purple-700 transition-all duration-200 hover:-translate-y-1"
            >
              {path === "/" ? "Home" :
                path.replace("/", "").charAt(0).toUpperCase() + path.slice(2)
              }
            </Link>
          ))}

          {/* CART ICON */}
          <Link href="/cart" className="relative text-3xl hover:scale-110 transition">
            🛒
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs px-2 py-0.5 rounded-full shadow-md">
                {cartCount}
              </span>
            )}
          </Link>

          {/* LOGIN / LOGOUT */}
          {user ? (
            <button
              onClick={logout}
              className="bg-red-500 px-5 py-2 rounded-lg text-white font-semibold shadow-lg hover:bg-red-600 transition-all"
            >
              Logout
            </button>
          ) : (
            <Link
              href="/login"
              className="bg-linear-to-r from-purple-500 to-purple-700 px-5 py-2 rounded-lg text-white font-semibold shadow-lg hover:shadow-purple-500/30 hover:-translate-y-1 transition-all"
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
      {open && (
        <div className="md:hidden bg-black/40 backdrop-blur-xl border-t border-white/20 px-6 pb-4 text-white animate-fadeIn">


          {["/", "/products", "/about", "/contact"].map((path, i) => (
            <Link key={i} href={path} className="block py-3 text-lg text-purple-700">
              {path === "/" ? "Home" :
                path.replace("/", "").charAt(0).toUpperCase() + path.slice(2)
              }
            </Link>
          ))}

          {/* CART */}
          <Link href="/cart" className="block py-3 text-lg">
            🛒 Cart
            {cartCount > 0 && (
              <span className="ml-2 bg-purple-600 text-white text-xs px-2 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </Link>

          {/* LOGIN / LOGOUT (MOBILE) */}
          {user ? (
            <button
              onClick={logout}
              className="block py-3 text-red-300 font-semibold text-lg"
            >
              Logout
            </button>
          ) : (
            <Link
              href="/login"
              className="block py-3 text-purple-300 font-semibold text-lg"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
