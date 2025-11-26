/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";
import { useAuth } from "@/Context/AuthContext";

export default function RegisterPage() {
    const { registerUser, loginWithGoogle } = useAuth();
    const router = useRouter();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);

    const onChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);

        const result = await registerUser(form);

        if (result.ok) {
            toast.success("Account created successfully");
            router.push("/");
        } else {
            toast.error(result.message || "Something went wrong");
        }

        setLoading(false);
    };

    const handleGoogle = async () => {
        setGoogleLoading(true);

        const result = await loginWithGoogle();
        if (result.ok) {
            toast.success("Logged in with Google ");
            router.push("/");
        } else {
            toast.error(result.message || "Google login failed");
        }

        setGoogleLoading(false);
    };

    return (
        <main className="min-h-screen flex items-center justify-center px-4 py-10 
        bg-linear-to-br from-[#1a063a] via-[#3f1e72] to-[#11001d]">

            <div className="w-full max-w-md bg-white/10 backdrop-blur-2xl 
            text-white p-10 rounded-3xl shadow-2xl border border-white/20 animate-fadeIn">

                {/* Title */}
                <h1 className="text-4xl font-extrabold text-center mb-3 tracking-wide">
                    Create Account
                </h1>
                <p className="text-center text-gray-300 mb-8">
                    Join <span className="text-purple-300 font-semibold">PrimeKart</span> today!
                </p>

                {/* Google Login */}
                <button
                    onClick={handleGoogle}
                    disabled={googleLoading}
                    className="w-full flex items-center justify-center gap-3 py-3 
                    bg-white text-gray-900 rounded-lg shadow-lg hover:bg-gray-100 
                    transition font-semibold mb-6 cursor-pointer"
                >
                    <img
                        src="https://img.icons8.com/?size=100&id=17949&format=png&color=000000"
                        alt="Google"
                        className="w-6"
                    />
                    {googleLoading ? "Please wait..." : "Sign up with Google"}
                </button>

                {/* Divider */}
                <div className="flex items-center gap-3 my-6">
                    <div className="h-px bg-white/30 w-full" />
                    <span className="text-white/70">OR</span>
                    <div className="h-px bg-white/30 w-full" />
                </div>

                {/* Form */}
                <form onSubmit={handleRegister} className="space-y-6">

                    {/* Full Name — Floating Label */}
                    <div className="relative">
                        <input name="name" type="text" required value={form.name} onChange={onChange} placeholder=" " className="w-full p-3 rounded-lg bg-white/10 border border-white/30 text-white peer focus:outline-none focus:ring-2 focus:ring-purple-400 transition" />
                        <label className="absolute left-3 top-3 text-gray-300 text-sm pointer-events-none transition-all peer-focus:top-1 peer-focus:text-xs peer-focus:text-purple-300 peer-not-placeholder-shown:top-1 peer-not-placeholder-shown:text-xs  peer-not-placeholder-shown:text-purple-200">Full Name</label>
                    </div>

                    {/* Email — Floating Label */}
                    <div className="relative">
                        <input name="email" type="email" required value={form.email} onChange={onChange} placeholder=" " className="w-full p-3 rounded-lg bg-white/10 border border-white/30 text-white peer focus:outline-none focus:ring-2 focus:ring-purple-400 transition" />
                        <label className="absolute left-3 top-3 text-gray-300 text-sm pointer-events-none transition-all peer-focus:top-1 peer-focus:text-xs peer-focus:text-purple-300 peer-not-placeholder-shown:top-1 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-purple-200">Email Address</label>
                    </div>

                    {/* Password — Floating Label */}
                    <div className="relative">
                        <input name="password" type="password" required value={form.password} onChange={onChange} placeholder=" " className="w-full p-3 rounded-lg bg-white/10 border border-white/30 text-white peer focus:outline-none focus:ring-2 focus:ring-purple-400 transition" />
                        <label className="absolute left-3 top-3 text-gray-300 text-sm pointer-events-none transition-all peer-focus:top-1 peer-focus:text-xs peer-focus:text-purple-300 peer-not-placeholder-shown:top-1 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-purple-200">Password</label>
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-3 rounded-lg text-lg font-semibold shadow-xl cursor-pointer
                        bg-linear-to-r from-purple-500 to-purple-700 hover:from-purple-600 
                        hover:to-purple-800 transition-transform transform hover:-translate-y-1
                        ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
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
