"use client";

import { Marquee } from "@/components/ui/marquee";
import { cn } from "@/lib/utils";
import bata from "../../../assets/ourpartenLogo/bata2-removebg-preview.png";
import shajgoj from "../../../assets/ourpartenLogo/channels4_profile-removebg-preview.png";
import britiscouncil from "../../../assets/ourpartenLogo/1212-20240830194113-removebg-preview.png";
import apex from "../../../assets/ourpartenLogo/apex_footwear-removebg-preview.png";
import chaldal from "../../../assets/ourpartenLogo/Chaldal.com_logo-removebg-preview.png";

const partners = [bata, apex, britiscouncil, shajgoj, chaldal];

const LogoCard = ({ img }: { img: string }) => {
  return (
    <div
      className={cn(
        "flex items-center justify-center w-52 h-32 rounded-xl border bg-white dark:bg-[#1a1f2e]",
        "border-gray-200/60 dark:border-gray-700/60 shadow-sm hover:shadow-md transition-all duration-300"
      )}
    >
      <img
        src={img}
        alt="Partner logo"
        className="w-36 h-auto object-contain"
      />
    </div>
  );
};

export function OurPartner() {
  return (
    <section className="relative flex w-full flex-col items-center justify-center overflow-hidden py-16 transition-colors duration-500">
      <h1 className="text-4xl font-bold mb-10 text-gray-800 dark:text-white">
        Our Partners
      </h1>

      <Marquee pauseOnHover className="[--duration:25s]">
        {partners.map((img, idx) => (
          <LogoCard key={idx} img={img} />
        ))}
      </Marquee>

      {/* Gradient fade edges */}
      <div className="from-gray-50 dark:from-[#0b0c10] pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r"></div>
      <div className="from-gray-50 dark:from-[#0b0c10] pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l"></div>
    </section>
  );
}
