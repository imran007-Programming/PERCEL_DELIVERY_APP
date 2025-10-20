"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export interface MonthlyRevenue {
  month: string;
  revenue: number;
}

interface RevenueLineChartProps {
  data: MonthlyRevenue[];
}

export const MonthlyRevenueChart= ({ data }:RevenueLineChartProps) => {
  const labels = data.map((item) => item.month);
  const dataPoints = data.map((item) => item.revenue);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Monthly Revenue",
        data: dataPoints,
        fill: true,
        backgroundColor: "rgba(34, 197, 94, 0.2)",
        borderColor: "rgba(34, 197, 94, 1)",
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: { color: "#374151" },
      },
      tooltip: {
        mode: "index" as const,
        intersect: false,
      },
    },
    scales: {
      x: {
        ticks: { color: "#374151" },
        grid: { color: "rgba(0,0,0,0.05)" },
      },
      y: {
        ticks: { color: "#374151" },
        grid: { color: "rgba(0,0,0,0.05)" },
      },
    },
  };

  return (
    <div className="w-full h-64 sm:h-80 md:h-96 p-4 bg-white dark:bg-[#1E1E2F] rounded-xl shadow-md">
        <h1>Monthly Revenue</h1>
      <Line key={JSON.stringify(dataPoints)} data={chartData} options={options} />
    </div>
  );
};
