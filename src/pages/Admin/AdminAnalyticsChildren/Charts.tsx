import { Bar, Pie } from "react-chartjs-2";

interface ChartsProps {
  userBarData: { labels: string[]; datasets: { label: string; data: number[] }[] };
  barData: { labels: string[]; datasets: { label: string; data: number[] }[] };
  pieData: { labels: string[]; datasets: { data: number[]; backgroundColor?: string[] }[] };
}


export default function Charts({ userBarData, barData, pieData }:ChartsProps) {
  return (
    <div>
      <div className="flex flex-wrap gap-6">
        {/* Parcel Bar Chart */}
        <div className="flex-1 min-w-[300px] max-w-[400px] bg-[#6F4A8E] darkbg-gray-900 p-5 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-3 text-gray-200 dark:text-gray-100">
            Parcel Status (Bar Chart)
          </h3>
          <div className="w-full h-64">
            <Bar
              data={barData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { labels: { color: "#fff" } } },
                scales: {
                  x: { ticks: { color: "#fff" } },
                  y: { ticks: { color: "#fff" } },
                },
              }}
            />
          </div>
        </div>

        {/* Parcel Pie Chart */}
        <div className="flex-1 min-w-[300px] max-w-[400px] bg-gray-800 dark:bg-gray-900 p-5 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-3 text-gray-200 dark:text-gray-100">
            Parcel Status (Pie Chart)
          </h3>
          <div className="w-full h-64">
            <Pie
              data={pieData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { labels: { color: "#fff" } } },
              }}
            />
          </div>
        </div>

        {/* Users Bar Chart */}
        <div className="flex-1 min-w-[300px] max-w-[400px] bg-[#6F4A8E] dark:bg-gray-900 p-5 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-3 text-gray-200 dark:text-gray-100">
            Total Users by Role
          </h3>
          <div className="w-full h-64">
            <Bar
              data={userBarData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { labels: { color: "#fff" } } },
                scales: {
                  x: { ticks: { color: "#fff" } },
                  y: { ticks: { color: "#fff" } },
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
