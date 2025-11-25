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

    // PROTECT CHECKOUT PAGE
    useEffect(() => {
        if (!user) {
            toast.error("Please login to continue");
            router.replace("/login?redirect=/checkout");
        } else {
            setForm((prev) => ({ ...prev, email: user.email, fullName: user.name || "" }));
        }
    }, [user, router]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const placeOrder = async () => {
        if (!form.fullName || !form.phone || !form.address) {
            toast.error("Please fill all required fields");
            return;
        }

        if (cart.length === 0) {
            toast.error("Your cart is empty");
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
                image: item.image,
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

            // SUCCESS FLOW 🚀
            toast.success("Order placed successfully!");

            await clearCart(); // ensures cart is cleaned before redirect

            setTimeout(() => {
                router.push("/ordersuccess");
            }, 800); // allow toast animation

        } catch (err) {
            toast.error("Something went wrong!");
        }
    };

    return (
        <main className="w-11/12 mx-auto py-10">
            <h1 className="text-4xl font-bold mb-10 text-purple-700">Checkout</h1>

            <div className="grid lg:grid-cols-3 gap-10">
                {/* LEFT — BILLING */}
                <div className="lg:col-span-2 bg-white p-8 rounded-xl shadow-lg border border-purple-100">
                    <h2 className="text-2xl font-semibold mb-6">Billing Details</h2>

                    <div className="space-y-5">
                        <input
                            type="text"
                            name="fullName"
                            placeholder="Full Name"
                            value={form.fullName}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
                        />

                        <input
                            type="email"
                            disabled
                            value={form.email}
                            name="email"
                            className="w-full p-3 border rounded-lg bg-gray-100"
                        />

                        <input
                            type="number"
                            name="phone"
                            placeholder="Phone Number"
                            onChange={handleChange}
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
                        />

                        <textarea
                            name="address"
                            placeholder="Full Address"
                            onChange={handleChange}
                            className="w-full p-3 border rounded-lg h-28 focus:ring-2 focus:ring-purple-400 outline-none"
                        ></textarea>
                    </div>
                </div>

                {/* RIGHT — SUMMARY */}
                <div className="bg-white p-8 rounded-xl shadow-lg border border-purple-100">
                    <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>

                    {/* CART ITEMS PREVIEW */}
                    <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
                        {cart.map((item) => (
                            <div key={item._id} className="flex items-center justify-between border-b pb-3">
                                <div className="flex items-center gap-3">
                                    <img src={item.imageUrl} alt="item-image" className="w-14 h-14 rounded-lg object-cover" />
                                    <div>
                                        <h3 className="font-semibold">{item.title}</h3>
                                        <p className="text-sm text-gray-600">x {item.quantity}</p>
                                    </div>
                                </div>
                                <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                        ))}
                    </div>

                    <div className="text-gray-700 space-y-2 mt-6">
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span className="font-medium">${cartTotal.toFixed(2)}</span>
                        </div>

                        <div className="flex justify-between">
                            <span>Shipping</span>
                            <span className="font-medium">$5.00</span>
                        </div>

                        <div className="border-t my-4"></div>

                        <div className="flex justify-between text-xl font-bold">
                            <span>Total</span>
                            <span className="text-purple-700">${(cartTotal + 5).toFixed(2)}</span>
                        </div>
                    </div>

                    <button
                        onClick={placeOrder}
                        disabled={cart.length === 0}
                        className={`w-full mt-6 text-white py-3 rounded-lg text-lg font-semibold transition ${cart.length === 0
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-purple-600 hover:bg-purple-700"
                            }`}
                    >
                        {cart.length === 0 ? "Cart is Empty" : "Place Order"}
                    </button>
                </div>
            </div>
        </main>
    );
}
