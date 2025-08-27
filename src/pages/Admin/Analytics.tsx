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
  const { data: percels, isLoading } = useGetPercelByAdminQuery(undefined);

  if (isLoading) return <Loader/>;

  const totalParcels = percels?.percelData;

  if (!totalParcels || totalParcels.length === 0)
    return <div>No parcel data available.</div>;

  // Extract **last status** of each parcel
  const lastStatuses = totalParcels.map((parcel: IPercel) => {
    const events = parcel.trackingEvents;
    if (events && events.length > 0) {
      return events[events.length - 1].status; // last event status
    }
    return "No Status"; // fallback for parcels with no trackingEvents
  });

  // Count last statuses
  const parcelStatusData = lastStatuses.reduce((acc: any, status: string) => {
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  const labels = Object.keys(parcelStatusData);
  const values = Object.values(parcelStatusData);

  // Bar Chart Data
  const barData = {
    labels,
    datasets: [
      {
        label: "Number of Parcels",
        data: values,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Pie Chart Data
  const pieData = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: ["#FF5733", "#33FF57", "#3357FF", "#F0E442", "#FF33A1"],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div className="my-5" style={{ padding: "20px" }}>
      <h2>Parcel Analytics</h2>
      <p className="text-xl text-primary my-2">
        Total Number of Parcels: {totalParcels.length}
      </p>

      <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
        <div style={{ width: "45%", minWidth: "300px", marginBottom: "20px" }}>
          <Bar data={barData} options={{ responsive: true }} />
        </div>
        <div style={{ width: "45%", minWidth: "300px", marginBottom: "20px" }}>
          <Pie data={pieData} options={{ responsive: true }} />
        </div>
      </div>
    </div>
  );
};

export default Analytics;
