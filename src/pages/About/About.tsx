import { motion } from "framer-motion";
import about_img1 from "../../assets/about_page_logo/ChatGPT Image Aug 22, 2025, 07_22_53 PM.png"

export default function About() {
  return (
    <div className="py-16 my-6">
      <section className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <motion.h2
          className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          About Us
        </motion.h2>

        {/* Company Info */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Text Section */}
          <motion.div
            className="lg:w-1/2 text-center lg:text-left"
            initial={{ opacity: 0, x: -200 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
              Your Trusted Delivery Partner
            </h3>
            <p className="mt-4 text-lg text-gray-700 dark:text-gray-200">
              We are a leading parcel delivery service, committed to delivering your packages with speed, safety, and reliability. Our goal is to provide exceptional service to our customers by ensuring on-time and secure deliveries every time.
            </p>
            <p className="mt-4 text-lg text-gray-700 dark:text-gray-200">
              Whether you're sending a small package or a large shipment, we have the expertise and infrastructure to get your parcel to its destination quickly and safely.
            </p>
          </motion.div>

          {/* Image Section */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <img
              className="h-[200px] sm:h-[300px] lg:h-[400px] w-auto object-cover"
              src={about_img1}
              alt="Delivery Services"
            />
          </motion.div>
        </div>

        {/* Our Mission */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Our Mission
          </h3>
          <p className="mt-4 text-lg text-gray-700 dark:text-gray-200">
            Our mission is to provide fast, reliable, and secure parcel delivery services to customers worldwide. We believe in leveraging technology and logistics expertise to ensure a seamless experience for our clients.
          </p>
        </motion.div>

        {/* Our Vision */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Our Vision
          </h3>
          <p className="mt-4 text-lg text-gray-700 dark:text-gray-200">
            Our vision is to be the most trusted delivery partner, offering exceptional customer service, innovative delivery solutions, and seamless tracking capabilities. We strive to make sending and receiving parcels as easy as possible for everyone.
          </p>
        </motion.div>
      </section>
    </div>
  );
}
