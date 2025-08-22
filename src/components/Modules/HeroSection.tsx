import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import ImageLight from "../../assets/images/ChatGPT Image Aug 21, 2025, 04_58_51 PM.png";

import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <div>
      <section className="dark:bg-gray-900 flex items-center justify-between">
        <div className="xl:px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-12 flex flex-col lg:flex-row items-center lg:items-center">
          {/* Text Section */}
          <motion.div
            className="lg:w-1/2 text-center lg:text-left"
            initial={{ opacity: 0, x: -200 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h1 className="uppercase text-4xl font-bold text-gray-900 sm:text-5xl dark:text-white text-start">
              <span>
                Get your packages delivered quickly and
              </span>
              <br />
              <span className="text-primary">
                safely affordable rates
              </span>
            </h1>

            <motion.p
              className="mt-4 text-base text-pretty text-gray-700 sm:text-lg/relaxed dark:text-gray-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              We’re dedicated to offering fast, reliable, and secure delivery
              services that meet your needs. Whether you're sending a small
              package or a large shipment, we ensure that your parcels are
              delivered on time.
            </motion.p>

            {/* Button Section */}
            <div className="mt-3 flex sm:flex-row sm:space-x-2 sm:justify-start justify-center items-center">
              <motion.div
                className="mb-2 sm:mb-0 w-35 h-14 sm:w-auto sm:h-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Button className="dark:text-white p-4 h-13 font-bold">
                  Get Started
                </Button>
              </motion.div>

              <motion.div
                className="mb-2 sm:mb-0 w-35 h-14 sm:w-auto sm:h-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Button className="dark:text-white font-bold p-4 h-13">
                  Track Your Parcel <ArrowRight size={23} scale={20} />
                </Button>
              </motion.div>
            </div>
          </motion.div>

          {/* Image Section */}
          <motion.div
            className="mt-8 lg:mt-0 lg:w-1/2 flex justify-center"
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <img
              className="h-[400px] sm:h-[500px] lg:h-[600px] w-auto object-cover ml-8"
              src={ImageLight}
              alt="Delivery"
            />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
