/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/Context/CartContext";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const { cart, addToCart } = useCart();

  useEffect(() => {
    if (!id) return;

    axios
      .get(`https://prime-kart-server.vercel.app/api/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="py-32 text-center text-xl font-semibold animate-pulse">
        Loading product...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="py-32 text-center text-lg text-gray-600">
        Product not found.
      </div>
    );
  }

  const badgeColor = {
    high: "bg-red-500",
    medium: "bg-orange-500",
    low: "bg-green-500",
  };

  // Check if product already exists in cart
  const isInCart = cart.some((item) => item._id === product._id);

  return (
    <main className="w-11/12 mx-auto py-16">
      {/* Breadcrumb */}
      <div className="mb-6 text-sm text-gray-600">
        <Link href="/" className="hover:text-purple-600">Home</Link> /
        <Link href="/products" className="hover:text-purple-600 ml-1">Products</Link> /
        <span className="ml-1 text-gray-900 font-medium">{product.title}</span>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        
        {/* Image Box */}
        <div className="bg-white rounded-2xl shadow-xl p-5 border border-gray-200">
          <img
            src={product.imageUrl}
            alt={product.title}
            className="w-full h-[450px] object-fit rounded-xl"
          />
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            {product.title}
          </h1>

          <span
            className={`text-white text-sm px-3 py-1 rounded-full shadow-md ${badgeColor[product.priority]}`}
          >
            {product.priority === "high"
              ? "🔥 Trending"
              : product.priority === "medium"
              ? "⭐ Popular"
              : "⚡ New"}
          </span>

          <p className="mt-6 text-gray-700 leading-relaxed text-lg">
            {product.fullDescription}
          </p>

          <p className="mt-8 text-purple-600 font-extrabold text-4xl">
            ${product.price}
          </p>

          {/* ADD TO CART BUTTON */}
          <button
            disabled={isInCart}
            onClick={() => addToCart(product)}
            className={`mt-8 w-full py-4 rounded-xl text-lg font-semibold shadow-lg transition cursor-pointer
              ${
                isInCart
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-purple-600 hover:bg-purple-700 text-white"
              }
            `}
          >
            {isInCart ? "Added to Cart" : "Add to Cart"}
          </button>
        </div>
      </div>
    </main>
  );
}
