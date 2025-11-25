"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function PopularProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/products") 
      .then((res) => {
        setProducts(res.data);
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
        <h2 className="text-3xl font-bold mb-8 text-gray-900">
          Popular Products
        </h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-xl shadow-sm hover:shadow-lg transition border"
            >
              <img
                src={item.imageUrl} 
                alt={item.title}
                className="w-full h-56 object-cover rounded-t-xl"
              />

              <div className="p-4">
                <h3 className="text-lg font-semibold">{item.title}</h3>

                <p className="text-gray-600 mt-1">{item.brand}</p>

                <p className="text-purple-600 font-bold text-xl mt-2">
                  ${item.price}
                </p>

                <button className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg transition">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* If empty */}
        {products.length === 0 && (
          <p className="text-center py-10 text-gray-600">
            No products found.
          </p>
        )}
      </div>
    </section>
  );
}
