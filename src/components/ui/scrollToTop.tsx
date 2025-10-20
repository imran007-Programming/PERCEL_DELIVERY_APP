
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {MoveUp } from "lucide-react";


const ScrollToTopProgress = () => {
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const scrolled = (scrollTop / docHeight) * 100;
      setScrollPercent(scrolled);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const circleRadius = 28;
  const circumference = 2 * Math.PI * circleRadius;
  const strokeDashoffset = circumference - (scrollPercent / 100) * circumference;

  return (
    <div
      className="fixed bottom-8 right-8 z-50 cursor-pointer group"
      onClick={scrollToTop}
    >
      <div className="relative w-16 h-16 flex items-center justify-center">
        {/* SVG progress ring */}
        <svg className="absolute w-full h-full rotate-[-90deg]">
          {/* Background circle */}
          <circle
            cx="32"
            cy="32"
            r={circleRadius}
            className="stroke-gray-300 dark:stroke-gray-50"
            strokeWidth="4"
            fill="none"
          />
          {/* Progress circle */}
          <motion.circle
            cx="32"
            cy="32"
            r={circleRadius}
            className="stroke-primary"
            strokeWidth="4"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            transition={{ duration: 0.1 }}
          />
        </svg>

        {/* Inner content */}
        <div className="flex flex-col items-center justify-center">
          <MoveUp className="text-primary group-hover:-translate-y-1 transition-transform duration-200" />
          <span className="text-xs font-semibold text-black dark:text-white">
            {Math.round(scrollPercent)}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default ScrollToTopProgress;
