import { useGetAlluserQuery } from "@/components/Redux/Features/Auth/auth.api";
import { useGetPercelByAdminQuery } from "@/components/Redux/Features/Percel/percel.api";
import { NumberTicker } from "@/components/ui/number-ticker";
import type { IPercel } from "@/types";
import { Box, Truck, User } from "lucide-react";

export default function OurAchievement() {
  const { data } = useGetAlluserQuery(null);
  const { data:allpercel } = useGetPercelByAdminQuery(null);
  

  const getSender = data?.data?.userData?.filter((el:IPercel) => el.role === "SENDER");
  const getReciever = data?.data?.userData?.filter((el:IPercel) => el.role === "RECEIVER");


  const stats = [
    {
      label: "Total Senders",
      value: getSender?.length,
      icon: <User className="text-blue-500 text-4xl mb-3" />,
    },
    {
      label: "Total Receivers",
      value: getReciever?.length,
      icon: <Box className="text-emerald-500 text-4xl mb-3" />,
    },
    {
      label: "Successfully Delivered Parcels",
      value: allpercel?.percelData.length,
      icon: <Truck className="text-yellow-500 text-4xl mb-3" />,
    },
  ];

  return (
    <section className="py-20  transition-colors duration-500">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-center text-4xl font-bold mb-12 text-gray-800 dark:text-white">
          Our Achievements
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {stats.map((item, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center p-8 bg-white dark:bg-[#1a1f2e] rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
            >
              {item.icon}
              <NumberTicker
                value={item.value}
                className="text-5xl font-semibold tracking-tight text-gray-900 dark:text-gray-100"
              />
              <p className="mt-2 text-lg font-medium text-gray-600 dark:text-gray-300 text-center">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
