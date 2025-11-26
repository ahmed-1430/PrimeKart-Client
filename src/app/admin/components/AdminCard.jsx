"use client";

export default function AdminCard({ title, value, icon }) {
    return (
        <div className="bg-white rounded-lg shadow p-5 flex items-center gap-4">
            <div className="text-4xl">{icon}</div>
            <div>
                <p className="text-gray-500 text-sm">{title}</p>
                <h2 className="text-2xl font-semibold">{value}</h2>
            </div>
        </div>
    );
}
