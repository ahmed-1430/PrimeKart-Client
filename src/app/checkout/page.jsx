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

    //  PROTECT THE PAGE
    useEffect(() => {
        if (!user) {
            toast.error("Please login to continue");
            router.push("/login");
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
            })),
            total: cartTotal + 5,
            address: form.address,
        };

        const res = await fetch("https://your-server-url/api/orders", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(orderData),
        });

        const data = await res.json();

        if (res.ok) {
            toast.success("Order placed successfully!");
            clearCart();
            router.push("/ordersuccess");
        } else {
            toast.error(data.message || "Failed to place order");
        }
    };

    return (
        <main className="w-11/12 mx-auto py-12">
            <h1 className="text-4xl font-bold mb-8">Checkout</h1>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* LEFT SIDE — CUSTOMER DETAILS */}
                <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md border">
                    <h2 className="text-2xl font-semibold mb-4">Billing Details</h2>

                    <div className="space-y-5">
                        <input
                            type="text"
                            name="fullName"
                            placeholder="Full Name"
                            onChange={handleChange}
                            className="w-full p-3 border rounded-lg"
                        />

                        <input
                            type="email"
                            name="email"
                            defaultValue={user?.email}
                            disabled
                            className="w-full p-3 border rounded-lg bg-gray-100"
                        />

                        <input
                            type="number"
                            name="phone"
                            placeholder="Phone Number"
                            onChange={handleChange}
                            className="w-full p-3 border rounded-lg"
                        />

                        <textarea
                            name="address"
                            placeholder="Full Address"
                            onChange={handleChange}
                            className="w-full p-3 border rounded-lg h-28"
                        ></textarea>
                    </div>
                </div>

                {/* RIGHT SIDE — ORDER SUMMARY */}
                <div className="bg-white p-6 rounded-xl shadow-md border">
                    <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>

                    <div className="text-gray-700 space-y-2 mb-6">
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>${cartTotal.toFixed(2)}</span>
                        </div>

                        <div className="flex justify-between">
                            <span>Shipping</span>
                            <span>$5.00</span>
                        </div>

                        <div className="border-t my-4"></div>

                        <div className="flex justify-between text-xl font-bold">
                            <span>Total</span>
                            <span>${(cartTotal + 5).toFixed(2)}</span>
                        </div>
                    </div>

                    <button
                        onClick={placeOrder}
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg text-lg font-semibold"
                    >
                        Place Order
                    </button>
                </div>
            </div>
        </main>
    );
}
