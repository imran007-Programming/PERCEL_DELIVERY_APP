import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import vector2 from "../../assets/images/vector2.png";
import vector3 from "../../assets/images/vector3.png";
import vector4 from "../../assets/images/vector4.png";

export default function HeroSection1() {
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect();
      const isVisible = rect.top <= window.innerHeight && rect.bottom >= 0;
      setIsInView(isVisible);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className="grid grid-cols-1 justify-center items-center dark:bg-gray-900 "  
      ref={sectionRef}
    >
      <h1 className="sm:text-5xl text-3xl text-center font-bold my-5">
        Every Step of the Way <strong className="text-primary">#HereWithYou!</strong>
      </h1>
      <div className="flex flex-col lg:flex-row items-center justify-center">
        <motion.img
          className="sm:w-full md:w-2/3 lg:w-[400px] xl:w-[500px] w-[250px] max-h-[350px] h-auto object-contain"
          src={vector4}
          alt="Vector 4"
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 1 : 0 }}
          transition={{ duration: 2 }}
        />
        <motion.img
          className="sm:w-full md:w-2/3 lg:w-[400px] xl:w-[500px] w-[250px] max-h-[250px] h-auto object-contain"
          src={vector2}
          alt="Vector 2"
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 1 : 0 }}
          transition={{ duration: 2 }}
        />
        <motion.img
          className="sm:w-full md:w-2/3 lg:w-[400px] xl:w-[500px] w-[290px] max-h-[250px] h-auto object-contain"
          src={vector3}
          alt="Vector 3"
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 1 : 0 }}
          transition={{ duration: 2 }}
        />
      </div>
    </div>
  );
}
