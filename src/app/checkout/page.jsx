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

    const [form, setForm] = useState({
        fullName: "",
        email: "",
        phone: "",
        address: "",
    });

    // PROTECT PAGE
    useEffect(() => {
        if (!user) {
            toast.error("Please login to continue");
            router.replace("/login?redirect=/checkout");
        } else {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setForm({
                fullName: user.name || "",
                email: user.email || "",
                phone: "",
                address: "",
            });
        }
    }, [user, router]);

    const handleInput = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // PLACE ORDER
    const placeOrder = async () => {
        if (!form.fullName || !form.phone || !form.address) {
            toast.error("Please fill all required fields");
            return;
        }

        const orderData = {
            userId: user?.id,
            customer: {
                name: form.fullName,
                email: form.email,
                phone: form.phone,
            },
            items: cart.map(item => ({
                id: item._id,
                title: item.title,
                price: item.price,
                quantity: item.quantity,
                image: item.imageUrl,
            })),
            total: cartTotal + 5,
            address: form.address,
        };

        try {
            const res = await fetch("http://localhost:3000/api/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(orderData),
            });

            const data = await res.json();
            if (!res.ok) {
                toast.error(data.message || "Order failed");
                return;
            }

            toast.success("Order placed successfully!");
            await clearCart();

            setTimeout(() => router.push("/ordersuccess"), 700);
        } catch {
            toast.error("Something went wrong!");
        }
    };

    return (
        <main className="w-11/12 mx-auto py-12">
            <h1 className="text-4xl font-extrabold mb-10 text-center bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Checkout
            </h1>

            <div className="grid lg:grid-cols-3 gap-10">

                {/* LEFT SIDE FORM */}
                <section className="lg:col-span-2 p-8 rounded-3xl shadow-xl backdrop-blur-xl bg-white/70 border border-purple-100">
                    <h2 className="text-2xl font-semibold mb-6 text-purple-700">Billing Details</h2>

                    <div className="grid sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="font-medium text-gray-700">Full Name</label>
                            <input
                                type="text"
                                name="fullName"
                                placeholder="John Doe"
                                value={form.fullName}
                                onChange={handleInput}
                                className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-purple-300 outline-none"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                disabled
                                className="w-full p-3 border rounded-xl bg-gray-100 text-gray-500"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="font-medium text-gray-700">Phone</label>
                            <input
                                type="number"
                                name="phone"
                                placeholder="01XXXXXXXXX"
                                value={form.phone}
                                onChange={handleInput}
                                className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-purple-300 outline-none"
                            />
                        </div>

                        <div className="space-y-2 sm:col-span-2">
                            <label className="font-medium text-gray-700">Full Address</label>
                            <textarea
                                name="address"
                                placeholder="House, Road, Area, City"
                                value={form.address}
                                onChange={handleInput}
                                className="w-full p-3 border rounded-xl h-32 resize-none focus:ring-2 focus:ring-purple-300 outline-none"
                            ></textarea>
                        </div>
                    </div>
                </section>

                {/* RIGHT SIDE SUMMARY */}
                <section className="p-8 rounded-3xl shadow-xl bg-white border border-purple-100">
                    <h2 className="text-2xl font-semibold mb-6 text-purple-700">Order Summary</h2>

                    {/* CART ITEMS */}
                    <div className="space-y-5 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                        {cart.map(item => (
                            <div
                                key={item._id}
                                className="flex items-center justify-between border-b pb-3"
                            >
                                <div className="flex items-center gap-4">
                                    <img
                                        src={item.imageUrl}
                                        alt={item.title}
                                        className="w-16 h-16 rounded-xl shadow-md object-cover"
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

                    {/* PRICING */}
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
                        className={`w-full mt-8 py-4 rounded-2xl text-lg font-bold shadow-md transition-all ${cart.length === 0
                                ? "bg-gray-300 cursor-not-allowed"
                                : "bg-linear-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg hover:scale-[1.02]"
                            }`}
                    >
                        {cart.length === 0 ? "Cart is Empty" : "Place Order"}
                    </button>
                </section>
            </div>
        </main>
    );
}
