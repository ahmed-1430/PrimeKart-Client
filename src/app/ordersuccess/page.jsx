"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function OrderSuccess() {
    const router = useRouter();

    // AUTO REDIRECT AFTER 4 SECONDS
    useEffect(() => {
        const timer = setTimeout(() => {
            router.push("/orders");
        }, 4000);

        return () => clearTimeout(timer);
    }, [router]);

    return (
        <main className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
            <div className="relative">
                <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center animate-[pulse_1.8s_ease-in-out_infinite] shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="white" className="w-12 h-12">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                </div>
            </div>
            <h1 className="text-4xl font-bold mt-6 text-purple-700">Order Successful!</h1>
            <p className="text-gray-600 mt-3 max-w-md">Thank you for your purchase  <br />
                We’re processing your order and will update you soon.
            </p>
            <p className="text-sm text-gray-500 mt-8">Redirecting you automatically...</p>
            <button onClick={() => router.push("/orders")} className="mt-4 bg-purple-600 hover:bg-purple-700 text-white py-2 px-6 rounded-lg transition cursor-pointer">View My Orders</button>
        </main>
    );
}
