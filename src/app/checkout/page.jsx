/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/Context/AuthContext";
import { useCart } from "@/Context/CartContext";
import { toast } from "react-toastify";

export default function CheckoutPage() {
    const router = useRouter();
    const { user } = useAuth();
    const { cart, cartTotal, clearCart } = useCart();

    const [isReady, setIsReady] = useState(false);

    const [form, setForm] = useState({
        fullName: "",
        email: "",
        phone: "",
        address: "",
    });

    // PROTECT PAGE + AUTO FILL
    useEffect(() => {
        if (!user) {
            toast.error("Please login to continue");
            router.replace("/login?redirect=/checkout");
            return;
        }

        // Autofill user data safely
        setForm((prev) => ({
            ...prev,
            fullName: user?.name || "",
            email: user?.email || "",
        }));

        setIsReady(true);
    }, [user, router]);

    const handleInput = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const validate = () => {
        if (form.fullName.length < 3) return "Enter a valid full name";
        if (!form.phone || form.phone.length < 11) return "Enter a valid phone number";
        if (!form.address || form.address.length < 10) return "Enter a full delivery address";
        return null;
    };

    const placeOrder = async () => {
        const error = validate();
        if (error) return toast.error(error);

        if (!user?.token) {
            toast.error("Session expired. Please login again.");
            router.push("/login");
            return;
        }

        const orderData = {
            userId: user?.id,
            customer: {
                name: form.fullName,
                email: form.email,
                phone: form.phone,
            },
            address: form.address,
            items: cart.map(item => ({
                id: item._id,
                title: item.title,
                price: item.price,
                quantity: item.quantity,
                image: item.imageUrl,
            })),
            shipping: 5,
            total: cartTotal + 5,
        };

        try {
            const res = await fetch("http://localhost:3000/api/orders", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
                body: JSON.stringify(orderData),
            });

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.message || "Order failed");
                return;
            }

            toast.success("Order placed successfully");
            clearCart();
            router.push("/ordersuccess");

        } catch (err) {
            toast.error("Something went wrong!");
            console.log(err);
        }
    };

    if (!isReady) return null;

    return (
        <main className="w-11/12 mx-auto py-12">
            <h1 className="text-4xl font-extrabold mb-10 text-center bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Checkout
            </h1>

            <div className="grid lg:grid-cols-3 gap-10">

                {/* LEFT: Billing Form */}
                <section className="lg:col-span-2 p-8 rounded-3xl shadow-xl backdrop-blur-xl bg-white/70 border border-purple-100">
                    <h2 className="text-2xl font-semibold mb-6 text-purple-700">Billing Details</h2>

                    <div className="grid sm:grid-cols-2 gap-6">

                        {/* FULL NAME */}
                        <div className="relative">
                            <input
                                type="text"
                                name="fullName"
                                value={form.fullName}
                                onChange={handleInput}
                                placeholder=" "
                                className="w-full p-3 bg-white/30 border border-purple-200 rounded-xl text-gray-800
                                        peer focus:ring-2 focus:ring-purple-400 outline-none"
                            />
                            <label className="absolute left-3 top-3 text-gray-600 text-sm pointer-events-none transition-all peer-focus:top-[-18] peer-focus:text-xs peer-focus:text-purple-700 peer-not-placeholder-shown:top-[-15] peer-not-placeholder-shown:text-xs"> Full Name</label>
                        </div>

                        {/* EMAIL */}
                        <div className="relative">
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                disabled
                                className="w-full p-3 bg-gray-200 border border-gray-300 rounded-xl text-gray-600 cursor-not-allowed"
                            />                            
                        </div>

                        {/* PHONE */}
                        <div className="relative">
                            <input
                                type="number"
                                name="phone"
                                value={form.phone}
                                onChange={handleInput}
                                placeholder=" "
                                className="w-full p-3 bg-white/30 border border-purple-200 rounded-xl text-gray-800
                                            peer focus:ring-2 focus:ring-purple-400 outline-none"
                            />
                            <label className="absolute left-3 top-3 text-gray-600 text-sm pointer-events-none transition-all peer-focus:top-[-18] peer-focus:text-xs peer-focus:text-purple-700 peer-not-placeholder-shown:top-[-15] peer-not-placeholder-shown:text-xs">Phone Number</label>
                        </div>

                        {/* ADDRESS */}
                        <div className="relative sm:col-span-2">
                            <textarea
                                name="address"
                                value={form.address}
                                onChange={handleInput}
                                placeholder=" "
                                className="w-full p-3 bg-white/30 border border-purple-200 rounded-xl text-gray-800
                                            h-32 resize-none peer focus:ring-2 focus:ring-purple-400 outline-none"
                            ></textarea>
                            <label className="absolute left-3 top-3 text-gray-600 text-sm pointer-events-none transition-all peer-focus:top-[-18] peer-focus:text-xs peer-focus:text-purple-700 peer-not-placeholder-shown:top-[-15] peer-not-placeholder-shown:text-xs">Full Address</label>
                        </div>

                    </div>
                </section>

                {/* RIGHT: Order Summary */}
                <section className="p-8 rounded-3xl shadow-xl bg-white border border-purple-100">
                    <h2 className="text-2xl font-semibold mb-6 text-purple-700">Order Summary</h2>

                    <div className="space-y-5 max-h-64 overflow-y-auto pr-2">
                        {cart.map(item => (
                            <div key={item._id} className="flex justify-between border-b pb-3">
                                <div className="flex items-center gap-4">
                                    <img
                                        src={item.imageUrl}
                                        alt={item.title}
                                        className="w-16 h-16 rounded-xl object-cover shadow"
                                    />
                                    <div>
                                        <h3 className="font-semibold">{item.title}</h3>
                                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                                    </div>
                                </div>
                                <p className="font-semibold text-purple-700">
                                    ${(item.price * item.quantity).toFixed(2)}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Price Summary */}
                    <div className="mt-6 space-y-3 text-gray-700">
                        <div className="flex justify-between">
                            <span className="font-medium">Subtotal</span>
                            <span>${cartTotal.toFixed(2)}</span>
                        </div>

                        <div className="flex justify-between">
                            <span className="font-medium">Shipping</span>
                            <span>$5.00</span>
                        </div>

                        <hr className="my-3" />

                        <div className="flex justify-between text-2xl font-extrabold">
                            <span>Total</span>
                            <span className="text-purple-700">
                                ${(cartTotal + 5).toFixed(2)}
                            </span>
                        </div>
                    </div>

                    <button
                        onClick={placeOrder}
                        disabled={cart.length === 0}
                        className={`w-full mt-8 py-4 rounded-2xl text-lg font-bold shadow-md transition-all cursor-pointer 
                            ${cart.length === 0
                                ? "bg-gray-300 cursor-not-allowed"
                                : "bg-linear-to-r from-purple-600 to-pink-600 text-white hover:scale-[1.02]"
                            }`}
                    >
                        {cart.length === 0 ? "Cart is Empty" : "Place Order"}
                    </button>
                </section>
            </div>
        </main>
    );
}
