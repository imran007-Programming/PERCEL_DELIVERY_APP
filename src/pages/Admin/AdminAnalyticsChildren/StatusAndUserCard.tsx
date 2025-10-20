interface ParcelStatusData {
  PENDING: number;
  DELIVERED: number;
  IN_TRANSIT: number;
  PICKED: number;
  CANCELED: number;
  RETURNED_REQUEST: number;
}

interface StatusAndUserProps {
  totalUsers: number;
  totalParcels: string[];
  parcelStatusData: ParcelStatusData;
  
}

export default function StatusAndUserCard({
  totalUsers,
  totalParcels,
  parcelStatusData,
}: StatusAndUserProps) {
  const stats = [
    { title: "Total Users", value: totalUsers, color: "text-blue-400" },
    { title: "Total Parcels", value: totalParcels.length, color: "text-green-400" },
    { title: "Parcels Pending", value: parcelStatusData.PENDING || 0, color: "text-yellow-400" },
    { title: "Parcels In Transit", value: parcelStatusData.IN_TRANSIT || 0, color: "text-pink-400" },
    { title: "Parcels Delivered", value: parcelStatusData.DELIVERED || 0, color: "text-emerald-400" },
    { title: "Parcels Picked", value: parcelStatusData.PICKED || 0, color: "text-cyan-400" },
    { title: "Parcels Canceled", value: parcelStatusData.CANCELED || 0, color: "text-rose-400" },
    { title: "Parcels Returned", value: parcelStatusData.RETURNED_REQUEST || 0, color: "text-orange-400" },
  ];

  return (
    <div className="my-5 px-5">
      <h2 className="text-2xl font-bold mb-5 text-gray-700 dark:text-gray-100">
        Parcel Analytics Dashboard
      </h2>

      {/* Responsive Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((item, i) => (
          <div
            key={i}
            className="group bg-white dark:bg-[#1E1E2F] p-6 rounded-xl shadow-lg 
                       transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <p className="text-gray-600 dark:text-gray-300 text-sm uppercase tracking-wide mb-2">
              {item.title}
            </p>
            <p
              className={`text-3xl font-extrabold text-gray-900 dark:text-white group-hover:${item.color}`}
            >
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
