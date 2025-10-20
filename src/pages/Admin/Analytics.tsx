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
import loaderJson from "../../assets/lottie/Forklift loading truck.json";
import { useGetAlluserQuery } from "@/components/Redux/Features/Auth/auth.api";
import LottieLoader from "@/shared/lotttieAnimation";
import StatusAndUserCard from "./AdminAnalyticsChildren/StatusAndUserCard";
import Charts from "./AdminAnalyticsChildren/Charts";
import TotalRevenue from "./AdminAnalyticsChildren/TotalRevenue";
import dayjs from "dayjs";
import { MonthlyRevenueChart, type MonthlyRevenue } from "./AdminAnalyticsChildren/MonthRevenueChart";


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

  if (percelsLoading || usersLoading) {
    return (
      <LottieLoader
        animationData={loaderJson}
        size={150}
        ariaLabel="Loading app..."
      />
    );
  }

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
  const parcelStatusData = lastStatuses.reduce((acc: Record<string, number>, status: string) => {
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const labels = Object.keys(parcelStatusData);
  const values: number[] = Object.values(parcelStatusData) as number[];

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
  const userRoles = users.reduce((acc: Record<string, number>, user: { role?: string }) => {
    const role = user.role || "Customer";
    acc[role] = (acc[role] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const userLabels = Object.keys(userRoles);
  const userValues: number[] = Object.values(userRoles) as number[];

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

  /* Percel Summery */

  const percelSummery = percels?.percelData?.map((percel: IPercel) => {
    const lastEvents = percel.trackingEvents[percel.trackingEvents.length - 1];
    return {
      status: lastEvents.status,
      fee: percel.fee || 0,
    };
  });

  /* total Revenue */
  const totalRevenue = percelSummery
    .filter((p: { status: string; fee: number }) => p.status === "DELIVERED")
    .reduce((sum: number, p: { status: string; fee: number }) => sum + p.fee, 0);

  /* Motnthly revenue */

  const deliveredParcels = percels?.percelData?.filter((p: IPercel) => {
    const lastEvent = p.trackingEvents[p.trackingEvents.length - 1];
    return lastEvent?.status === "DELIVERED";
  });

  

  // 2️⃣ Group by month and sum revenue
  const monthlyRevenueMap = deliveredParcels.reduce((acc: Record<string, number>, percel: IPercel) => {
    const month = dayjs(percel.createdAt).format("MMM YYYY");
    acc[month] = (acc[month] || 0) + percel.fee;
    return acc;
  }, {} as Record<string, number>);

  // 3️⃣ Convert to array for charting
  const monthlyRevenueData: MonthlyRevenue[] = Object.entries(monthlyRevenueMap).map(
  ([month, revenue]) => ({
    month,
    revenue: Number(revenue), 
  })
);




  return (
    <div className="my-5 px-5 space-y-5">
      {/* Cards */}
      <StatusAndUserCard
        parcelStatusData={parcelStatusData}
        totalParcels={totalParcels}
        totalUsers={totalUsers}
      />
      {/* Total Revenue */}
      <TotalRevenue totalRevenue={totalRevenue} />

      {/*Monthly Revenue */}
      <MonthlyRevenueChart data={monthlyRevenueData}/>
      {/* Charts */}
      <Charts barData={barData} pieData={pieData} userBarData={userBarData} />
    </div>
  );
};

export default Analytics;
