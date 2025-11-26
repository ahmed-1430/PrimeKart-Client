"use client";

import { useState } from "react";
import axios from "axios";

export default function UpdateOrderModal({ order, onClose, onUpdated }) {
  const [status, setStatus] = useState(order.status);
  const [loading, setLoading] = useState(false);

  const statuses = [
    "Pending",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ];

  const handleUpdate = async () => {
    setLoading(true);

    try {
      const res = await axios.put(
        `http://localhost:3000/api/admin/orders/${order._id}`,
        { status }
      );

      onUpdated(res.data); // return updated order to parent
    } catch (err) {
      console.log("Order update failed:", err);
    }

    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex justify-center items-center z-50">
      {/* Modal Container */}
      <div className="bg-white w-[95%] max-w-md rounded-2xl shadow-xl p-6 animate-fadeIn">
        <h2 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 text-transparent bg-clip-text">
          Update Order Status
        </h2>

        <p className="text-gray-500 mt-1 text-sm">
          Order ID: <span className="font-medium">#{order._id.slice(-6)}</span>
        </p>

        {/* Status Selector */}
        <div className="mt-5">
          <label className="text-sm font-medium text-gray-600">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full mt-1 p-3 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-purple-500 outline-none"
          >
            {statuses.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {/* Buttons */}
        <div className="flex justify-end mt-6 gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-gray-300 hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={handleUpdate}
            disabled={loading}
            className="px-5 py-2 rounded-xl bg-purple-600 text-white hover:bg-purple-700 shadow-md disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
