import { motion, useInView } from "framer-motion";
import image1 from "../../assets/Logo/Facelities_logo/1.png";
import image2 from "../../assets/Logo/Facelities_logo/2.png";
import image3 from "../../assets/Logo/Facelities_logo/3.png";
import React from "react";

export default function OurFacelities() {
  const ref = React.useRef(null);
  const inView = useInView(ref, {
    amount: 0.3, // Trigger the animation when 30% of the element is visible
  });

  return (
    <div ref={ref} className="py-10"> {/* Adding some padding to the container */}
      <h2 className="text-4xl font-bold my-10 text-center">Our Facilities</h2>
      <div className="flex flex-col sm:flex-row justify-center items-center gap-10"> {/* Adjusting gap for better spacing */}
        
        {/* First Image Section */}
        <motion.div
          className="flex flex-col items-center gap-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
          transition={{ duration: 1 }}
        >
          <img className="h-50 w-[250px] object-contain" src={image1} alt="Facility 1" /> {/* Adding width and object-contain */}
          <div>
            <strong className="text-3xl">Live Parcel Tracking</strong>
          </div>
          <div>
            <p className="text-xl text-gray-500 text-center">In our website, you can track your parcel in real-time to know the exact location and status.</p>
          </div>
        </motion.div>

        {/* Second Image Section */}
        <motion.div
          className="flex flex-col items-center gap-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <img className="h-50 w-[250px] object-contain" src={image2} alt="Facility 2" />
          <div>
            <strong className="text-3xl">24/7 Parcel Tracking</strong>
          </div>
          <div>
            <p className="text-xl text-gray-500 text-center">Our system operates 24/7, allowing you to track parcels at any time, anywhere.</p>
          </div>
        </motion.div>

        {/* Third Image Section */}
        <motion.div
          className="flex flex-col items-center gap-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <img className="h-50 w-[250px] object-contain" src={image3} alt="Facility 3" />
          <div>
            <strong className="text-3xl">Safe Delivery</strong>
          </div>
          <div>
            <p className="text-xl text-gray-500 text-center">We ensure your packages are delivered safely, with reliable tracking to confirm successful delivery.</p>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
