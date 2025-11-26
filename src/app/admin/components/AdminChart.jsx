"use client";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

export default function AdminChart({ data }) {
    return (
        <div className="bg-white shadow rounded-lg p-5 mt-6">
            <h2 className="text-xl font-semibold mb-3">Revenue Overview</h2>
            <Line data={data} />
        </div>
    );
}
