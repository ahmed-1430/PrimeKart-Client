/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";
import { useAuth } from "@/Context/AuthContext";

export default function LoginPage() {
    const { login, loginWithGoogle } = useAuth();
    const router = useRouter();

    const [form, setForm] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);

    const onChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        const result = await login(form);

        if (result.ok) {
            toast.success("Login Successful 🎉");
            router.push("/");
        } else {
            toast.error(result.message || "Something went wrong");
        }

        setLoading(false);
    };

    const handleGoogleLogin = async () => {
        setGoogleLoading(true);

        const res = await loginWithGoogle();

        if (res.ok) {
            toast.success("Logged in with Google 🎉");
            router.push("/");
        } else {
            toast.error(res.message);
        }

        setGoogleLoading(false);
    };

    return (
        <main className="min-h-screen flex items-center justify-center bg-linear-to-br from-purple-600 via-purple-800 to-gray-900 px-4">
            <div className="w-full max-w-md bg-white/10 backdrop-blur-xl text-white p-10 rounded-2xl shadow-2xl border border-white/10">
                <h1 className="text-4xl font-extrabold text-center mb-2">Welcome Back </h1>
                <p className="text-center text-gray-200 mb-10">
                    Login to continue shopping
                </p>
                {/* Login With Google */}
                <button
                    onClick={handleGoogleLogin}
                    disabled={googleLoading}
                    className="w-full bg-white text-gray-900 py-3 rounded-lg font-semibold shadow-md cursor-pointer
                     hover:bg-gray-100 transition flex items-center justify-center gap-3 mb-6">
                    <img src="https://img.icons8.com/?size=100&id=17949&format=png&color=000000" alt="google" class="w-6" />
                    {googleLoading ? "Connecting..." : "Continue with Google"}
                </button>
                <div className="flex items-center gap-4 my-6">
                    <div className="flex-1 h-px bg-white/20"></div>
                    <p className="text-gray-300 text-sm">OR</p>
                    <div className="flex-1 h-px bg-white/20"></div>
                </div>
                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="text-sm font-semibold">Email</label>
                        <input name="email" type="email" onChange={onChange} value={form.email} required className="w-full mt-2 p-3 rounded-md bg-white/20 border border-white/20 text-white                          placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-300 transition" placeholder="Enter your email" />
                    </div>

                    <div>
                        <label className="text-sm font-semibold">Password</label>
                        <input name="password" type="password" onChange={onChange} value={form.password} required className="w-full mt-2 p-3 rounded-md bg-white/20 border border-white/20 text-white                          placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-300 transition" placeholder="Enter your password" />
                    </div>
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
                <p className="text-center text-gray-200 mt-8">
                    New here?{" "}
                    <Link href="/register" className="text-purple-300 underline hover:text-purple-100 transition">Create an account</Link>
                </p>
            </div>
        </main>
    );
}
