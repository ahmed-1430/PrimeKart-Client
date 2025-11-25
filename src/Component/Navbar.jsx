'use client';

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">

        {/* Logo */}
        <h1 className="text-2xl font-bold text-[--color-primary]">
          PrimeKart
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 font-medium">
          <Link href="/" className="hover:text-[--color-primary]">Home</Link>
          <Link href="/products" className="hover:text-[--color-primary]">Products</Link>
          <Link href="/about" className="hover:text-[--color-primary]">About</Link>
          <Link href="/contact" className="hover:text-[--color-primary]">Contact</Link>
        </div>

        {/* Login Button */}
        <Link 
          href="/login" 
          className="hidden md:block bg-[--color-primary] text-white px-4 py-2 rounded">
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
          <Link href="/login" className="block py-2 text-[--color-primary] font-bold">Login</Link>
        </div>
      )}
    </nav>
  );
}
