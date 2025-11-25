"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  const searchFiltered = products.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  const categoryFiltered =
    category === "all"
      ? searchFiltered
      : searchFiltered.filter(
          (p) => p.category.toLowerCase() === category.toLowerCase()
        );

  const uniqueCategories = ["all", ...new Set(products.map((p) => p.category))];

  const badgeColor = {
    high: "bg-gradient-to-r from-red-500 to-red-600",
    medium: "bg-gradient-to-r from-orange-500 to-amber-500",
    low: "bg-gradient-to-r from-green-500 to-emerald-500",
  };

  return (
    <main className="w-11/12 mx-auto px-6 py-16">

      {/* ====================== HEADER ====================== */}
      <div className="text-center mb-14">
        <h1 className="text-5xl font-extrabold tracking-tight text-gray-900">
          Explore Our Products
        </h1>
        <p className="mt-4 text-gray-500 text-lg">
          Hand-picked premium gadgets curated just for you.
        </p>
      </div>

      {/* ====================== SEARCH + FILTER ====================== */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-12 bg-white/60 backdrop-blur-md p-5 rounded-2xl shadow-lg border border-gray-200">
        
        {/* Search */}
        <input
          type="text"
          placeholder="Search for products..."
          className="w-full md:w-1/2 px-5 py-3 border rounded-xl shadow-sm focus:ring-2 ring-purple-500 transition bg-white"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Category Pills */}
        <div className="flex flex-wrap gap-3">
          {uniqueCategories.map((cat, i) => (
            <button
              key={i}
              onClick={() => setCategory(cat)}
              className={`
                px-4 py-2 rounded-full text-sm font-medium transition 
                ${category === cat ? "bg-purple-600 text-white shadow-md" : "bg-gray-200 hover:bg-gray-300"}
              `}
            >
              {cat === "all" ? "All" : cat}
            </button>
          ))}
        </div>
      </div>

      {/* ====================== LOADING ====================== */}
      {loading && (
        <div className="py-20 text-center text-xl font-semibold animate-pulse">
          Loading products...
        </div>
      )}

      {/* ====================== PRODUCTS GRID ====================== */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {categoryFiltered.map((item) => (
          <Link
            key={item._id}
            href={`/products/${item._id}`}
            className="group bg-white rounded-2xl border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden hover:-translate-y-1"
          >
            {/* Image */}
            <div className="relative">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-64 object-fit rounded-t-2xl group-hover:scale-110 transition-all duration-500"
              />

              {/* Priority Badge */}
              <span
                className={`absolute top-3 left-3 text-white text-sm px-3 py-1 rounded-full shadow-xl ${badgeColor[item.priority]}`}
              >
                {item.priority === "high"
                  ? "🔥 Trending"
                  : item.priority === "medium"
                  ? "⭐ Popular"
                  : "⚡ New"}
              </span>
            </div>

            {/* Content */}
            <div className="p-5">
              <h3 className="text-lg font-bold group-hover:text-purple-600 transition">
                {item.title}
              </h3>

              <p className="text-gray-500 text-sm mt-2 line-clamp-2">
                {item.shortDescription}
              </p>

              <p className="mt-4 text-purple-600 font-extrabold text-2xl">
                ${item.price}
              </p>

              <button className="w-full mt-5 bg-purple-600 group-hover:bg-purple-700 text-white py-2 rounded-lg transition font-medium shadow-md">
                View Details
              </button>
            </div>
          </Link>
        ))}
      </div>

      {/* ====================== NO DATA ====================== */}
      {!loading && categoryFiltered.length === 0 && (
        <div className="text-center text-gray-600 text-lg mt-20">
          No products found.
        </div>
      )}
    </main>
  );
}
