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
        const res = await axios.get("http://localhost:3000/api/admin/orders");
        setOrders(res.data);
        setFiltered(res.data);
      } catch (err) {
        console.log("Order fetch error:", err);
      }
      setLoading(false);
    }

    loadOrders();
  }, [user]);

  // Filter order by status
  const applyFilter = (value) => {
    setStatusFilter(value);

    if (value === "all") {
      setFiltered(orders);
    } else {
      setFiltered(orders.filter((o) => o.status === value));
    }
  };

  if (!user || user.role !== "admin")
    return (
      <div className="h-[70vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-red-600">Access Denied</h2>
        <p>You are not authorized.</p>
      </div>
    );

  if (loading)
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <div className="h-10 w-10 border-4 border-purple-500 border-t-transparent animate-spin rounded-full"></div>
      </div>
    );

  return (
    <div className="p-6">
      <h1 className="text-3xl font-extrabold bg-linear-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
        Orders Management
      </h1>
      <p className="text-gray-500 mt-1">Review and update customer orders.</p>

      {/* FILTERS */}
      <div className="mt-6 flex gap-4">
        <select
          value={statusFilter}
          onChange={(e) => applyFilter(e.target.value)}
          className="px-4 py-2 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-purple-500 outline-none"
        >
          <option value="all">All Orders</option>
          <option value="Pending">Pending</option>
          <option value="Processing">Processing</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      {/* ORDERS TABLE */}
      <div className="mt-6 bg-white rounded-2xl shadow-md p-5 overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead>
            <tr className="border-b text-gray-600">
              <th className="p-3">Order</th>
              <th className="p-3">Customer</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Items</th>
              <th className="p-3">Status</th>
              <th className="p-3">Date</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((order) => (
              <tr key={order._id} className="border-b hover:bg-gray-50 transition">
                <td className="p-3 font-medium text-gray-700">
                  #{order._id.slice(-6)}
                </td>

                <td className="p-3">{order.customer?.name}</td>

                <td className="p-3 text-purple-600 font-semibold">
                  ${order.total}
                </td>

                <td className="p-3">{order.items?.length} items</td>

                <td className="p-3">
                  <StatusBadge status={order.status} />
                </td>

                <td className="p-3">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>

                {/* ACTION BUTTON */}
                <td className="p-3 text-center">
                  <button onClick={() => setSelectedOrder(order)} className="px-4 py-1 text-sm rounded-lg bg-purple-600 text-white hover:bg-purple-700 cursor-pointer"> Update</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="py-10 text-center text-gray-500">No orders found</div>
        )}
      </div>

      {/* UPDATE ORDER MODAL */}
      {selectedOrder && (
        <UpdateOrderModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onUpdated={(updated) => {
            // update UI instantly
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

/* STATUS BADGE COMPONENT */
function StatusBadge({ status }) {
  const colors = {
    Pending: "bg-yellow-200 text-yellow-800",
    Processing: "bg-blue-200 text-blue-800",
    Shipped: "bg-purple-200 text-purple-800",
    Delivered: "bg-green-200 text-green-800",
    Cancelled: "bg-red-200 text-red-800",
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm ${colors[status]}`}>
      {status}
    </span>
  );
}
