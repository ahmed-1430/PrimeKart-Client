"use client";

import axios from "axios";
import { useState } from "react";

export default function UpdateOrderModal({ order, onClose, onUpdated }) {
  const [status, setStatus] = useState(order.status);
  const [loading, setLoading] = useState(false);

  const statuses = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"];

  const updateStatus = async () => {
    setLoading(true);

    try {
      const res = await axios.put(
        `http://localhost:3000/api/admin/orders/${order._id}`,
        { status }
      );

      onUpdated(res.data);
    } catch (err) {
      console.log("Order update error", err);
    }

    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-lg animate-fade">

        <h2 className="text-xl font-bold text-gray-800">Update Order</h2>
        <p className="text-gray-500 text-sm">
          Order ID: #{order._id.slice(-6)}
        </p>

        {/* STATUS SELECT */}
        <div className="mt-4">
          <label className="block mb-1 font-medium">Order Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-purple-500 outline-none cursor-pointer">
            {statuses.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {/* BUTTONS */}
        <div className="flex justify-end gap-3 mt-6">
          <button onClick={onClose} className="px-4 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 cursor-pointer">Cancel</button>
          <button onClick={updateStatus} disabled={loading} className="px-5 py-2 rounded-xl bg-purple-600 text-white hover:bg-purple-700 disabled:opacity-50 cursor-pointer"> {loading ? "Updating..." : "Update"}</button>
        </div>
      </div>
    </div>
  );
}