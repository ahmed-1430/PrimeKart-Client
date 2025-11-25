"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";
import { useAuth } from "@/Context/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await login(form);

    if (result.ok) {
      toast.success("Login Successful 🎉");
      router.push("/checkout");
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
          Welcome Back 👋
        </h1>
        <p className="text-center text-gray-200 mb-10">
          Login to access your account and continue shopping
        </p>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-6">

          <div>
            <label className="text-sm font-semibold">Email</label>
            <input
              name="email"
              type="email"
              onChange={onChange}
              value={form.email}
              required
              className="w-full mt-2 p-3 rounded-md bg-white/20 border border-white/20 text-white placeholder-gray-200
                         focus:outline-none focus:ring-2 focus:ring-purple-300 backdrop-blur-sm transition"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="text-sm font-semibold">Password</label>
            <input
              name="password"
              type="password"
              onChange={onChange}
              value={form.password}
              required
              className="w-full mt-2 p-3 rounded-md bg-white/20 border border-white/20 text-white placeholder-gray-200
                         focus:outline-none focus:ring-2 focus:ring-purple-300 backdrop-blur-sm transition"
              placeholder="Enter your password"
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
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-200 mt-8">
          New here?{" "}
          <Link
            href="/register"
            className="text-purple-300 underline hover:text-purple-100 transition"
          >
            Create an account
          </Link>
        </p>
      </div>
    </main>
  );
}
