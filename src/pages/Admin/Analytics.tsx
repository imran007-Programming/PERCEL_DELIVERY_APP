import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from "chart.js";
import { useGetPercelByAdminQuery } from "@/components/Redux/Features/Percel/percel.api";

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const Analytics = () => {
  const { data: percels, isLoading } = useGetPercelByAdminQuery(undefined);

  // Handle loading or empty state
  if (isLoading) {
    return <div>Loading...</div>;
  }

  const totalParcels = percels?.percelData;

  // Ensure totalParcels is not null or undefined before proceeding
  if (!totalParcels || totalParcels.length === 0) {
    return <div>No parcel data available.</div>;
  }

  // Flatten all statuses from trackingEvents array
  const allStatuses = totalParcels?.map((item) =>
    item.trackingEvents?.map((event) => event.status) // Extracting statuses from each event
  ).flat(); // Flattening the array

  // Check if allStatuses is not empty
  if (!allStatuses || allStatuses.length === 0) {
    return <div>No parcel status data available.</div>;
  }

  // Count parcel statuses
  const parcelStatusData = allStatuses?.reduce((acc, status) => {
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  // Bar Chart Data (Parcel Status Count)
  const barData = {
    labels: Object.keys(parcelStatusData),
    datasets: [
      {
        label: "Number of Parcels",
        data: Object.values(parcelStatusData),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Pie Chart Data (Parcel Status Distribution)
  const pieData = {
    labels: Object.keys(parcelStatusData),
    datasets: [
      {
        data: Object.values(parcelStatusData),
        backgroundColor: ["#FF5733", "#33FF57", "#3357FF", "#F0E442"],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Parcel Analytics</h2>
      <p>Total Number of Parcels: {totalParcels.length}</p>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {/* Bar Chart for Parcel Status */}
        <div style={{ width: "45%" }}>
          <h3>Parcel Status Distribution (Bar Chart)</h3>
          <Bar data={barData} options={{ responsive: true }} />
        </div>

        {/* Pie Chart for Parcel Status */}
        <div style={{ width: "45%" }}>
          <h3>Parcel Status Distribution (Pie Chart)</h3>
          <Pie data={pieData} options={{ responsive: true }} />
        </div>
      </div>
    </div>
  );
};

export default Analytics;
