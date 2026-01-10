"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@/Context/AuthContext";
import UpdateOrderModal from "./UpdateOrderModal";

export default function OrdersPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    if (!user || user.role !== "admin") return;

    async function loadOrders() {
      try {
        const res = await axios.get(
          "https://prime-kart-server.vercel.app/api/admin/orders"
        );
        setOrders(res.data);
        setFiltered(res.data);
      } catch { }
      setLoading(false);
    }

    loadOrders();
  }, [user]);

  const applyFilter = (value) => {
    setStatusFilter(value);
    setFiltered(value === "all" ? orders : orders.filter((o) => o.status === value));
  };

  if (!user || user.role !== "admin") {
    return (
      <div className="h-[70vh] flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold text-red-400">Access Denied</h2>
        <p className="text-gray-400">Admins only</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <div className="h-10 w-10 border-4 border-purple-500 border-t-transparent animate-spin rounded-full" />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen p-8">
      {/* background glow */}
      <div className="absolute inset-0 -z-10 bg-linear-to-br from-purple-900/20 via-pink-900/20 to-indigo-900/20 blur-3xl" />

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-4xl font-black bg-linear-to-r from-purple-500 to-pink-400 bg-clip-text text-transparent">
          Orders Management
        </h1>
        <p className="text-gray-400 mt-1">
          Review, filter, and update customer orders
        </p>
      </div>

      {/* FILTER */}
      <div className="mb-6">
        <select
          value={statusFilter}
          onChange={(e) => applyFilter(e.target.value)}
          className="glass-panel p-3! text-slate-400 cursor-pointer outline-none w-56"
        >
          <option value="all">All Orders</option>
          <option value="Pending">Pending</option>
          <option value="Processing">Processing</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      {/* TABLE */}
      <div className="glass-panel overflow-x-auto">
        <table className="w-full min-w-[900px]">
          <thead>
            <tr className="border-b border-white/10 text-slate-500">
              <th className="p-4">Order</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Items</th>
              <th className="p-4">Status</th>
              <th className="p-4">Date</th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((order) => (
              <tr
                key={order._id}
                className="border-b border-white/5 hover:bg-white/5 transition"
              >
                <td className="p-4 font-mono text-slate-400">
                  #{order._id.slice(-6)}
                </td>

                <td className="p-4 text-slate-400">
                  {order.customer?.name}
                </td>

                <td className="p-4 font-bold text-slate-400">
                  ${order.total}
                </td>

                <td className="p-4 text-slate-400">
                  {order.items?.length} items
                </td>

                <td className="p-4">
                  <StatusBadge status={order.status} />
                </td>

                <td className="p-4 text-gray-400">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>

                <td className="p-4 text-center">
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="px-4 py-1.5 rounded-lg
                    bg-linear-to-r from-purple-600 to-pink-400
                    text-white text-sm
                    hover:scale-105 transition cursor-pointer"
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="py-10 text-center text-gray-400">
            No orders found
          </div>
        )}
      </div>

      {/* MODAL */}
      {selectedOrder && (
        <UpdateOrderModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onUpdated={(updated) => {
            setOrders((prev) =>
              prev.map((o) => (o._id === updated._id ? updated : o))
            );
            setFiltered((prev) =>
              prev.map((o) => (o._id === updated._id ? updated : o))
            );
            setSelectedOrder(null);
          }}
        />
      )}
    </div>
  );
}

/* -------- STATUS BADGE -------- */

function StatusBadge({ status }) {
  const styles = {
    Pending: "bg-rose-400/20 text-rose-500 border border-rose-400/30",
    Processing: "bg-blue-400/20 text-blue-500 border border-blue-400/30",
    Shipped: "bg-purple-400/20 text-purple-400 border border-purple-400/30",
    Delivered: "bg-green-400/20 text-green-500 border border-green-400/30",
    Cancelled: "bg-red-400/20 text-red-300 border border-red-400/30",
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm backdrop-blur ${styles[status]}`}>
      {status}
    </span>
  );
}
