
import { Iphone } from "@/components/ui/iphone";

import { useRef, useState, useEffect } from "react";

export default function HereWithUs() {
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Detect scroll to trigger fade-in animation
  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const visible = rect.top <= window.innerHeight && rect.bottom >= 0;
        setIsInView(visible);
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="flex flex-col lg:flex-row items-center justify-center gap-10 py-16 px-6 sm:px-12  transition-colors duration-500"
    >
      {/* 🔹 Left Side: Lottie Animation */}
      <div
        className={`w-full lg:w-1/2 flex justify-center transition-opacity duration-1000 ${
          isInView ? "opacity-100" : "opacity-0"
        }`}
      >
       
          <Iphone    videoSrc="lottie" className="w-[300px] sm:w-[400px] md:w-[450px] lg:w-[300px]"  />
      </div>

      {/* 🔹 Right Side: Text Section */}
      <div
        className={`w-full lg:w-1/2 text-center lg:text-left transition-all duration-1000 ${
          isInView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
          Every Step of the Way{" "}
          <span className="text-primary">#HereWithYou</span>
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg max-w-lg mx-auto lg:mx-0">
          From the moment your parcel leaves your hands to its final destination, 
          we’re with you every step of the journey. Safe, fast, and reliable 
          delivery — because your trust drives us.
        </p>
      </div>
    </section>
  );
}
