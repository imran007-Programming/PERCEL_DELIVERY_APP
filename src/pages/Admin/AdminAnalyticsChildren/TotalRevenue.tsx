export default function TotalRevenue({
  totalRevenue,
}: {
  totalRevenue: number;
}) {
  return (
    <div className="my-5">
      <div className="rounded-2xl w-80 bg-white dark:bg-[#0f172a] p-6 shadow-lg transition-transform duration-300 hover:scale-[1.02]">
        <p className="text-gray-600 dark:text-gray-300 text-sm uppercase tracking-wide mb-2">
          Total Revenue
        </p>
        <p className="text-3xl font-extrabold text-gray-900 dark:text-white">
          ${totalRevenue.toLocaleString()}
        </p>
      </div>
    </div>
  );
}
