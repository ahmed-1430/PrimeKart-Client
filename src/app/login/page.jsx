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
            toast.error(result.message || "Invalid email or password");
        }

        setLoading(false);
    };

    const handleGoogleLogin = async () => {
        setGoogleLoading(true);

        const result = await loginWithGoogle();

        if (result.ok) {
            toast.success("Logged in with Google 🎉");
            router.push("/");
        } else {
            toast.error(result.message);
        }

        setGoogleLoading(false);
    };

    return (
        <main className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#0f021f] via-[#3a0a6a] to-[#120020] px-4">

            <div className="w-full max-w-lg bg-white/10 backdrop-blur-2xl text-white p-10 rounded-3xl shadow-[0_0_50px_rgba(175,0,255,0.2)] border border-white/20 animate-fadeIn">

                {/* Title */}
                <h1 className="text-4xl font-extrabold text-center mb-3 tracking-wide">
                    Welcome Back
                </h1>
                <p className="text-center text-gray-300 mb-8">
                    Log in to continue shopping at{" "}
                    <span className="text-purple-300 font-semibold">PrimeKart</span>
                </p>

                {/* Google Login */}
                <button
                    onClick={handleGoogleLogin}
                    disabled={googleLoading}
                    className="w-full bg-white text-gray-900 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl 
                    hover:bg-gray-100 transition-all flex items-center justify-center gap-3 mb-6"
                >
                    <img
                        src="https://img.icons8.com/?size=100&id=17949&format=png&color=000000"
                        alt="google"
                        className="w-6"
                    />
                    {googleLoading ? "Connecting..." : "Continue with Google"}
                </button>

                {/* Divider */}
                <div className="flex items-center gap-4 my-6">
                    <div className="flex-1 h-px bg-white/30"></div>
                    <p className="text-gray-300 text-sm">OR</p>
                    <div className="flex-1 h-px bg-white/30"></div>
                </div>

                {/* Login Form */}
                <form onSubmit={handleLogin} className="space-y-6">

                    {/* Email */}
                    <div className="relative">
                        <input type="email" name="email" value={form.email} onChange={onChange} required className="w-full p-3 rounded-lg bg-white/10 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-purple-400 peer transition" placeholder=" " />
                        <label className="absolute left-3 top-3 text-gray-300 text-sm pointer-events-none transition-all peer-focus:top-1 peer-focus:text-xs peer-focus:text-purple-300 peer-not-placeholder-shown:top-1 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-purple-200">Email Address</label>
                    </div>

                    {/* Password */}
                    <div className="relative">
                        <input type="password" name="password" value={form.password} onChange={onChange} required className="w-full p-3 rounded-lg bg-white/10 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-purple-400  peer transition" placeholder=" " />

                        <label className="absolute left-3 top-3 text-gray-300 text-sm pointer-events-none transition-all peer-focus:top-1 peer-focus:text-xs peer-focus:text-purple-300 peer-not-placeholder-shown:top-1 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-purple-200"> Password</label>
                    </div>
                    {/* Login Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-3 rounded-lg text-lg font-bold shadow-xl bg-linear-to-r 
                        from-purple-600 to-pink-600 hover:shadow-purple-500/40 hover:scale-[1.03] 
                        transition-transform ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                {/* Footer */}
                <p className="text-center text-gray-300 mt-8">
                    New to PrimeKart?{" "}
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
