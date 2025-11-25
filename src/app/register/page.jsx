/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";
import { useAuth } from "@/Context/AuthContext";

export default function RegisterPage() {
    const { registerUser, googleLogin } = useAuth();
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
            toast.success("Account created successfully 🎉");
            router.push("/login");
        } else {
            toast.error(result.message || "Something went wrong");
        }

        setLoading(false);
    };

    const handleGoogle = async () => {
        setGoogleLoading(true);

        const result = await googleLogin();
        if (result.ok) {
            toast.success("Logged in with Google 🎉");
            router.push("/");
        } else {
            toast.error(result.message || "Google login failed");
        }

        setGoogleLoading(false);
    };

    return (
        <main className="min-h-screen flex items-center justify-center bg-linear-to-br from-purple-600 via-purple-800 to-gray-900 px-4 py-10">

            <div className="w-full max-w-md bg-white/10 backdrop-blur-xl text-white p-10 rounded-2xl shadow-2xl border border-white/10 animate-fadeIn">

                {/* Title */}
                <h1 className="text-4xl font-extrabold text-center mb-3">
                    Create Account
                </h1>
                <p className="text-center text-gray-300 mb-8">
                    Join PrimeKart and start your shopping journey!
                </p>

                {/* Google Login */}
                <button
                    onClick={handleGoogle}
                    className="w-full flex items-center justify-center gap-3 py-3 bg-white text-gray-900 rounded-lg shadow-lg hover:bg-gray-100 transition font-semibold mb-6"
                >
                    <img src="https://img.icons8.com/?size=100&id=17949&format=png&color=000000" alt="Google" width={22} height={22}
                    />
                    {googleLoading ? "Please wait..." : "Sign up with Google"}
                </button>

                <div className="flex items-center gap-3 my-6">
                    <div className="h-px bg-white/20 w-full" />
                    <span className="text-white/70">OR</span>
                    <div className="h-px bg-white/20 w-full" />
                </div>

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
                            className="w-full mt-2 p-3 rounded-md bg-white/20 border border-white/20 text-white placeholder-gray-300
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
                            className="w-full mt-2 p-3 rounded-md bg-white/20 border border-white/20 text-white placeholder-gray-300
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
                            className="w-full mt-2 p-3 rounded-md bg-white/20 border border-white/20 text-white placeholder-gray-300
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
                    <Link href="/login" className="text-purple-300 underline hover:text-purple-100 transition">
                        Login
                    </Link>
                </p>
            </div>

        </main>
    );
}
