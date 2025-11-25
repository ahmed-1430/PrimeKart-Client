"use client";

import { useCart } from "@/Context/CartContext";
import Link from "next/link";

export default function CartPage() {
    const { cart, increaseQty, decreaseQty, removeFromCart, cartTotal } = useCart();

    return (
        <main className="w-11/12 mx-auto px-6 py-16">
            <h1 className="text-4xl font-bold mb-10">Your Cart</h1>

            {cart.length === 0 ? (
                <div className="text-center py-32">
                    <h2 className="text-2xl font-semibold text-gray-700">
                        Your cart is empty 🛒
                    </h2>
                    <Link
                        href="/products"
                        className="mt-5 inline-block px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                    >
                        Shop Products
                    </Link>
                </div>
            ) : (
                <div className="grid lg:grid-cols-3 gap-10">
                    {/* LEFT — CART ITEMS */}
                    <div className="lg:col-span-2 space-y-6">
                        {cart.map((item) => (
                            <div
                                key={item._id}
                                className="flex gap-6 bg-white p-5 rounded-xl shadow-md border border-gray-200"
                            >
                                {/* Image */}
                                <img
                                    src={item.imageUrl}
                                    alt={item.title}
                                    className="w-32 h-32 rounded-lg object-cover"
                                />

                                {/* Info */}
                                <div className="flex-1">
                                    <h2 className="text-xl font-semibold">{item.title}</h2>
                                    <p className="text-gray-600 text-sm mt-1">
                                        {item.shortDescription}
                                    </p>

                                    <p className="text-purple-600 font-bold text-xl mt-2">
                                        ${item.price}
                                    </p>

                                    {/* Quantity Controls */}
                                    <div className="flex items-center gap-3 mt-4">
                                        <button
                                            onClick={() => decreaseQty(item._id)}
                                            className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300"
                                        >
                                            -
                                        </button>

                                        <span className="text-lg font-semibold">
                                            {item.quantity}
                                        </span>

                                        <button
                                            onClick={() => increaseQty(item._id)}
                                            className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                {/* Remove Button */}
                                <button
                                    onClick={() => removeFromCart(item._id)}
                                    className="text-red-500 hover:text-red-600 text-sm font-semibold"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* RIGHT — ORDER SUMMARY */}
                    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 h-fit sticky top-24">
                        <h2 className="text-2xl font-bold mb-4">Order Summary</h2>

                        <div className="flex justify-between mb-3 text-gray-700">
                            <span>Subtotal</span>
                            <span>${cartTotal.toFixed(2)}</span>
                        </div>

                        <div className="flex justify-between mb-3 text-gray-700">
                            <span>Shipping</span>
                            <span>$5.00</span>
                        </div>

                        <div className="border-t my-4"></div>

                        <div className="flex justify-between text-xl font-bold mb-6">
                            <span>Total</span>
                            <span>${(cartTotal + 5).toFixed(2)}</span>
                        </div>

                        <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg text-lg font-semibold">
                            Checkout
                        </button>
                    </div>
                </div>
            )}
        </main>
    );
}
