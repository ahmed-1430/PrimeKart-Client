"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useCart } from "@/Context/CartContext";

export default function PopularProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const { cart, addToCart } = useCart();

    useEffect(() => {
        axios
            .get("https://prime-kart-server.vercel.app/api/products/")
            .then((res) => {
                // Filter only trending or popular
                const popular = res.data.filter(
                    (p) => p.priority === "high" || p.priority === "medium"
                );
                setProducts(popular);
            })
            .catch((err) => console.log("Error fetching products:", err))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="text-center py-20 text-xl font-semibold">
                Loading products...
            </div>
        );
    }

    return (
        <section className="py-20 bg-gray-50">
            <div className="w-11/12 mx-auto px-6">
                <h2 className="text-3xl font-bold mb-8 text-gray-900">Popular Products</h2>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
                    {products.map((item) => {
                        const inCart = cart.some((c) => c._id === item._id);

                        return (
                            <div
                                key={item._id}
                                className="bg-white rounded-xl shadow-md hover:shadow-xl transition  overflow-hidden"
                            >
                                {/* Product Image */}
                                <img
                                    src={item.imageUrl}
                                    alt={item.title}
                                    className="w-full h-56 object-fit"
                                />

                                <div className="p-4">
                                    <h3 className="text-lg font-semibold">{item.title}</h3>
                                    <p className="text-gray-600 mt-1">{item.brand}</p>

                                    <p className="text-purple-600 font-bold text-xl mt-2">
                                        ${item.price}
                                    </p>

                                    {/* Buttons */}
                                    <div className="flex gap-2 mt-4">
                                        <Link href={`/products/${item._id}`} className="flex-1 bg-gray-200 hover:bg-gray-300 py-2 rounded-lg text-center font-medium">View</Link>
                                        <button disabled={inCart} onClick={() => addToCart(item)} className={`flex-1 py-2 rounded-lg text-white font-medium transition cursor-pointer ${inCart
                                            ? "bg-gray-400 cursor-not-allowed"
                                            : "bg-purple-600 hover:bg-purple-700"
                                            }
                      `}
                                        >
                                            {inCart ? "✔ Added" : "Add"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {products.length === 0 && (
                    <p className="text-center py-10 text-gray-600">
                        No popular products found.
                    </p>
                )}
            </div>
        </section>
    );
}
