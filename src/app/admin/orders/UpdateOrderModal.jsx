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
        `https://prime-kart-server.vercel.app/api/admin/orders/${order._id}`,
        { status }
      );
      onUpdated(res.data);
    } catch { }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md">
      {/* MODAL */}
      <div className="glass-panel w-full max-w-md animate-fadeIn scale-95 hover:scale-100 transition">
        {/* HEADER */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold bg-linear-to-r from-purple-700 to-pink-500 bg-clip-text text-transparent">
            Update Order
          </h2>
          <p className="text-gray-200 text-sm mt-1">
            Order #{order._id.slice(-6)}
          </p>
        </div>

        {/* STATUS */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-200">
            Order Status
          </label>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full px-4 py-3 rounded-xl
            bg-white/10 backdrop-blur border border-white/20
            text-white outline-none cursor-pointer
            focus:ring-2 focus:ring-purple-500"
          >
            {statuses.map((s) => (
              <option key={s} value={s} className="text-black">
                {s}
              </option>
            ))}
          </select>

          {/* STATUS PREVIEW */}
          <div className="mt-4">
            <StatusBadge status={status} />
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex justify-end gap-3 mt-8">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl
            bg-white/10 backdrop-blur
            text-gray-200 hover:bg-white/20 transition cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={updateStatus}
            disabled={loading}
            className="px-6 py-2 rounded-xl
            bg-linear-to-r from-purple-600 to-pink-600
            text-white font-semibold
            hover:scale-105 transition
            disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* -------- STATUS PREVIEW BADGE -------- */

function StatusBadge({ status }) {
  const styles = {
    Pending: "bg-rose-400/20 text-rose-300 border border-rose-400/30",
    Processing: "bg-blue-400/20 text-blue-400 border border-blue-400/30",
    Shipped: "bg-purple-400/20 text-purple-300 border border-purple-400/30",
    Delivered: "bg-green-400/20 text-green-300 border border-green-400/30",
    Cancelled: "bg-red-400/20 text-red-300 border border-red-400/30",
  };

  return (
    <span
      className={`inline-block px-4 py-1.5 rounded-full text-sm font-semibold backdrop-blur ${styles[status]}`}
    >
      {status}
    </span>
  );
}
