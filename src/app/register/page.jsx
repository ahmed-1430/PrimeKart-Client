"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";
import { useAuth } from "@/Context/AuthContext";

export default function RegisterPage() {
  const { registerUser } = useAuth();
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const onChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await registerUser(form);

    if (result.ok) {
      toast.success("Account created successfully 🎉");
      router.push("/login");
    } else {
      toast.error(result.message || "Something went wrong");
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-linear-to-br from-purple-600 via-purple-800 to-gray-900 px-4">
      
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl text-white p-10 rounded-2xl shadow-2xl border border-white/10">

        {/* Title */}
        <h1 className="text-4xl font-extrabold text-center mb-4">
          Create Account 
        </h1>
        <p className="text-center text-gray-200 mb-10">
          Join PrimeKart and start your shopping journey!
        </p>

        {/* Form */}
        <form onSubmit={handleRegister} className="space-y-6">

          <div>
            <label className="text-sm font-semibold">Full Name</label>
            <input
              name="name"
              type="text"
              required
              value={form.name}
              onChange={onChange}
              placeholder="Enter your name"
              className="w-full mt-2 p-3 rounded-md bg-white/20 border border-white/20 text-white placeholder-gray-200
                         focus:outline-none focus:ring-2 focus:ring-purple-300 transition"
            />
          </div>

          <div>
            <label className="text-sm font-semibold">Email</label>
            <input
              name="email"
              type="email"
              required
              value={form.email}
              onChange={onChange}
              placeholder="Enter your email"
              className="w-full mt-2 p-3 rounded-md bg-white/20 border border-white/20 text-white placeholder-gray-200
                         focus:outline-none focus:ring-2 focus:ring-purple-300 transition"
            />
          </div>

          <div>
            <label className="text-sm font-semibold">Password</label>
            <input
              name="password"
              type="password"
              required
              value={form.password}
              onChange={onChange}
              placeholder="Create a password"
              className="w-full mt-2 p-3 rounded-md bg-white/20 border border-white/20 text-white placeholder-gray-200
                         focus:outline-none focus:ring-2 focus:ring-purple-300 transition"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg text-lg font-semibold shadow-xl
                        bg-linear-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800
                        transition-transform transform hover:-translate-y-1
                        ${loading && "opacity-60 cursor-not-allowed"}`}
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-200 mt-8">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-purple-300 underline hover:text-purple-100 transition"
          >
            Login
          </Link>
        </p>
      </div>
    </main>
  );
}
