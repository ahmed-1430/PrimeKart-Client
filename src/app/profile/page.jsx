"use client";

import { useAuth } from "@/Context/AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { toast } from "react-toastify";

export default function ProfilePage() {
    const { user } = useAuth();
    const [profile, setProfile] = useState({
        name: "",
        phone: "",
        address: "",
    });

    const [stats, setStats] = useState({
        totalOrders: 0,
        pending: 0,
        spent: 0,
    });

    const [recentOrders, setRecentOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    /* --------------------------
       LOAD USER + ORDERS + STATS
    ---------------------------*/
    useEffect(() => {
        if (!user) return;

        async function loadData() {
            try {
                setProfile({
                    name: user?.name || "",
                    phone: user?.phone || "",
                    address: user?.address || "",
                });

                const res = await axios.get(
                    `https://prime-kart-server.vercel.app/api/orders/${user.email}`
                );
                const orders = res.data;

                const spent = orders.reduce((acc, o) => {
                    if (typeof o.total === "number") return acc + o.total;

                    // fallback calculate if needed
                    const itemsTotal = o.items?.reduce(
                        (sum, item) => sum + item.price * item.quantity,
                        0
                    );

                    return acc + (itemsTotal || 0);
                }, 0);

                setStats({
                    totalOrders: orders.length,
                    pending: orders.filter((o) => o.status === "Pending").length,
                    spent,
                });

                setRecentOrders(orders.slice(0, 3));
            } catch (error) {
                // console.log(error);
            } finally {
                setLoading(false);
            }
        }

        loadData();
    }, [user]);

    /* --------------------------
           SAVE PROFILE
    ---------------------------*/
    const handleSave = async () => {
        try {
            await axios.put(
                `https://prime-kart-server.vercel.app/api/users/${user.id}`,
                profile
            );
            toast.success("Profile updated!");
        } catch (err) {
            toast.error("Update failed!");
        }
    };

    if (!user) {
        return (
            <div className="h-[60vh] flex items-center justify-center text-xl">
                Please login to view your profile.
            </div>
        );
    }

    if (loading)
        return (
            <p className="text-center py-10 text-lg animate-pulse text-purple-600">
                Loading profile...
            </p>
        );

    return (
        <div className="max-w-6xl mx-auto p-6 mt-10 space-y-12">
            {/* PROFILE HEADER */}
            <div className="p-10 rounded-3xl bg-linear-to-br from-purple-600/20 to-blue-500/20 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] border border-white/20 relative overflow-hidden">

                {/* Glow */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500/30 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-14 -left-10 w-52 h-52 bg-blue-500/30 rounded-full blur-3xl"></div>

                <div className="relative flex flex-col md:flex-row items-center gap-8 z-10">
                    {/* Avatar */}
                    <div className="w-32 h-32 rounded-full bg-linear-to-br from-purple-600 to-blue-500 flex items-center justify-center text-4xl font-bold text-white shadow-xl border border-white/20">
                        {profile.name
                            ? profile.name[0].toUpperCase()
                            : user.email[0].toUpperCase()}
                    </div>

                    {/* User Info */}
                    <div className="flex-1">
                        <h1 className="text-4xl font-bold bg-linear-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                            {profile.name || "Your Name"}
                        </h1>

                        <p className="text-gray-700 text-lg mt-2">{user.email}</p>

                        <p className="text-gray-600 mt-1 text-sm">
                            Member since:{" "}
                            <span className="font-medium">
                                {user.createdAt
                                    ? new Date(user.createdAt).toLocaleDateString()
                                    : "N/A"}
                            </span>
                        </p>
                    </div>
                </div>
            </div>

            {/* STATS */}
            <div className="grid md:grid-cols-3 gap-6">
                {[
                    { label: "Total Orders", value: stats.totalOrders, color: "purple" },
                    { label: "Pending", value: stats.pending, color: "yellow" },
                    {
                        label: "Total Spent", value: `$${stats.spent.toFixed(2)}`, color: "green",
                    },
                ].map((box, idx) => (
                    <div key={idx} className="p-6 rounded-2xl bg-white shadow-lg border border-zinc-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                        <h3 className="text-gray-500">{box.label}</h3>
                        <p className={`text-4xl font-bold mt-3 text-${box.color}-600`}>
                            {box.value}
                        </p>
                    </div>
                ))}
            </div>

            {/* EDIT PROFILE */}
            <div className="p-10 bg-white shadow-2xl rounded-3xl border border-zinc-100">
                <h2 className="text-3xl font-semibold mb-6 text-gray-800">Edit Profile</h2>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div>
                        <label className="font-medium text-gray-700">Full Name</label>
                        <input value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} className="mt-2 w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-600 transition" />
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="font-medium text-gray-700">Phone Number</label>
                        <input value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} className="mt-2 w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-600 transition" />
                    </div>

                    {/* Address */}
                    <div className="md:col-span-2">
                        <label className="font-medium text-gray-700">Shipping Address</label>
                        <textarea
                            value={profile.address}
                            onChange={(e) =>
                                setProfile({ ...profile, address: e.target.value })
                            }
                            className="mt-2 w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-600 transition h-28 resize-none"
                        ></textarea>
                    </div>
                </div>
                <button onClick={handleSave} className="mt-6 px-8 py-3 bg-linear-to-r from-purple-600 to-blue-600 text-white rounded-xl text-lg shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200 cursor-pointer">Save Changes</button>
            </div>

            {/* RECENT ORDERS */}
            <div className="p-10 bg-white rounded-3xl shadow-2xl border border-zinc-200">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-semibold text-gray-800">Recent Orders</h2>
                    <Link href="/orders" className="text-purple-600 font-medium hover:underline">View All</Link>
                </div>

                {recentOrders.length === 0 ? (
                    <p className="text-gray-500">No orders yet.</p>
                ) : (
                    <div className="space-y-4">
                        {recentOrders.map((o) => (
                            <div
                                key={o._id}
                                className="p-4 border rounded-xl bg-gray-50 hover:bg-gray-100 transition-all duration-200 shadow-sm"
                            >
                                <p className="font-semibold">Order #{o._id.slice(0, 10)}</p>
                                <p className="text-gray-600 text-sm">
                                    {new Date(o.createdAt).toLocaleDateString()}
                                </p>
                                <p className="font-bold text-purple-600 mt-1">
                                    ${o.total}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
