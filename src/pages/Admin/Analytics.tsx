import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { useGetPercelByAdminQuery } from "@/components/Redux/Features/Percel/percel.api";
import type { IPercel } from "@/types";
import Loader from "@/components/ui/Loader";
import { useGetAlluserQuery } from "@/components/Redux/Features/Auth/auth.api";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Analytics = () => {
  const { data: percels, isFetching: percelsLoading } =
    useGetPercelByAdminQuery(undefined);
  const { data: usersData, isFetching: usersLoading } = useGetAlluserQuery({});

  if (percelsLoading || usersLoading) return <Loader />;

  const totalParcels = percels?.percelData || [];
  const totalUsers = usersData?.data?.userData?.length || 0;
  const users = usersData?.data?.userData || [];
  if (!totalParcels.length) return <div>No parcel data available.</div>;

  // Extract last status of each parcel
  const lastStatuses = totalParcels.map((parcel: IPercel) => {
    const events = parcel.trackingEvents;
    return events && events.length > 0
      ? events[events.length - 1].status
      : "No Status";
  });

  // Count last statuses
  const parcelStatusData = lastStatuses.reduce((acc: any, status: string) => {
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  const labels = Object.keys(parcelStatusData);
  const values = Object.values(parcelStatusData);

  // Detect if dark mode is active
  const isDarkMode =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  // Chart colors
  const barColor = isDarkMode ? "#820CFF" : "#4F46E5"; // dark purple vs light blue
  const borderColor = isDarkMode ? "rgba(75, 192, 192, 1)" : "#2563EB"; // teal vs blue
  const pieColors = isDarkMode
    ? ["#00C951", "#820CFF", "#FF2056", "#F0E442", "#FF33A1"]
    : ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"]; // light mode colors

  const barData = {
    labels,
    datasets: [
      {
        label: "Number of Parcels",
        data: values,
        backgroundColor: barColor,
        borderColor: borderColor,
        borderWidth: 1,
        barThickness: 25,
        maxBarThickness: 50,
      },
    ],
  };

  const pieData = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: pieColors,
        hoverOffset: 4,
      },
    ],
  };

  // Total Users Bar Chart
  const userRoles = users.reduce((acc: any, user: any) => {
    const role = user.role || "Customer";
    acc[role] = (acc[role] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const userLabels = Object.keys(userRoles);
  const userValues = Object.values(userRoles);

  const userBarData = {
    labels: userLabels,
    datasets: [
      {
        label: "Total Users",
        data: userValues,
        backgroundColor: isDarkMode ? "white" : "white", // dark orange vs yellow
        borderColor: isDarkMode ? "white" : "white", // darker orange vs brown
        borderWidth: 1,
        barThickness: 25,
        maxBarThickness: 50,
      },
    ],
  };

  return (
    <div className="my-5 px-5 bg-[#EEEEEE] dark:bg-gray-900">
      <h2 className="text-2xl font-bold mb-5 text-gray-700 dark:text-gray-100">
        Parcel Analytics Dashboard
      </h2>

      {/* Cards */}
      <div className="flex flex-wrap font-medium  gap-6 mb-10">
        <div className="bg-[#222831]  dark:bg-blue-500 shadow-xl  rounded-lg p-6 flex-1 min-w-[100px] text-center">
          <p className="text-gray-200 dark:text-gray-300">Total Users</p>
          <p className="text-2xl font-bold text-white">{totalUsers}</p>
        </div>
        <div className="bg-[#393E46] dark:bg-green-500 shadow-xl  rounded-lg p-6 flex-1 min-w-[200px] text-center">
          <p className="text-gray-200 dark:text-gray-300">Total Parcels</p>
          <p className="text-2xl font-bold text-white">{totalParcels.length}</p>
        </div>
        <div className="bg-[#00ADB5]  text-primary dark:bg-primary shadow-xl  rounded-lg p-6 flex-1 min-w-[200px] text-center">
          <p className="text-gray-100 dark:text-gray-300">Parcels Pending</p>
          <p className="text-2xl font-bold text-white">
            {parcelStatusData.PENDING || 0}
          </p>
        </div>
        <div className="bg-[#EEEEEE] dark:bg-rose-500 shadow-xl  rounded-lg p-6 flex-1 min-w-[200px] text-center">
          <p className="text-gray-600 dark:text-gray-300">Parcels In Transit</p>
          <p className="text-2xl font-bold text-gray-600">
            {parcelStatusData.IN_TRANSIT || 0}
          </p>
        </div>
      </div>

      {/* Charts */}
      <div className="flex flex-wrap gap-6">
        {/* Parcel Bar Chart */}
        <div className="flex-1 min-w-[300px] max-w-[400px] bg-[#6F4A8E] dark:bg-gray-900 p-5 rounded-lg shadow-md">
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
};

export default Analytics;
