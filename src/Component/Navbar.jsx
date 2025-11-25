'use client';

import { useCart } from "@/Context/CartContext";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const { cart } = useCart(); // <-- GET CART DATA
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="w-full bg-white shadow sticky top-0 z-50">
      <div className="w-11/12 mx-auto px-4 py-4 flex justify-between items-center">

        {/* Logo */}
        <h1 className="text-2xl font-bold text-[--color-primary]">
          PrimeKart
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 font-medium items-center">
          <Link href="/" className="hover:text-[--color-primary]">Home</Link>
          <Link href="/products" className="hover:text-[--color-primary]">Products</Link>
          <Link href="/about" className="hover:text-[--color-primary]">About</Link>
          <Link href="/contact" className="hover:text-[--color-primary]">Contact</Link>

          {/* CART ICON */}
          <Link href="/cart" className="relative">
            <span className="text-2xl">🛒</span>

            {/* Count Badge */}
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[--color-primary] text-white text-xs px-2 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </Link>
        </div>

        {/* Login Button */}
        <Link
          href="/login"
          className="hidden md:block bg-[--color-primary] px-4 py-2 rounded text-white">
          Login
        </Link>

        {/* Mobile button */}
        <button className="md:hidden text-2xl" onClick={() => setOpen(!open)}>☰</button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden bg-white px-4 pb-4 shadow">

          <Link href="/" className="block py-2">Home</Link>
          <Link href="/products" className="block py-2">Products</Link>
          <Link href="/about" className="block py-2">About</Link>
          <Link href="/contact" className="block py-2">Contact</Link>

          {/* CART ICON IN MOBILE MENU */}
          <Link href="/cart" className="block py-2 text-lg">
            🛒 Cart
            {cartCount > 0 && (
              <span className="ml-2 bg-[--color-primary] text-white text-xs px-2 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </Link>

          <Link href="/login" className="block py-2 text-[--color-primary] font-bold">Login</Link>
        </div>
      )}
    </nav>
  );
}
