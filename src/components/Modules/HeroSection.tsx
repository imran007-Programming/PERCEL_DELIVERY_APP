import { ArrowRight, Crosshair } from "lucide-react";
import { Button } from "../ui/button";
import ImageLight from "../../assets/images/ChatGPT Image Aug 21, 2025, 04_58_51 PM.png";
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function HeroSection() {
  const [trackingId, setTrackingId] = useState("");
  const navigate = useNavigate();

  console.log(trackingId);

  const handleRedirect = () => {
    if (trackingId) {
      navigate(`/track/${trackingId}`)
    }
    else if(!trackingId){
      navigate('/track')
    }
  };
  return (
    <div>
      <section className="dark:bg-gray-900">
        <div className="px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-20 flex flex-col lg:flex-row items-center sm:mt-0 mt-10">
          {/* Text Section */}
          <motion.div
            className="lg:w-1/2 text-center lg:text-left space-y-6"
            initial={{ opacity: 0, x: -200 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h1 className="uppercase text-4xl font-bold text-gray-900 sm:text-5xl dark:text-white text-start">
              <span>Get your packages delivered quickly and</span>
              <br />
              <span className="text-primary">safely affordable rates</span>
            </h1>

            <motion.p
              className="text-start text-gray-700 sm:text-lg/relaxed dark:text-gray-200"
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
            <div className="flex flex-col items-start sm:items-center lg:items-start sm:flex-row lg:flex-row sm:space-y-3 lg:space-y-0 sm:space-x-2 justify-start mt-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* <Button className="dark:text-white font-bold h-12 px-6">Get Started</Button> */}
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Button className="dark:text-white font-bold h-12 px-6 flex items-center gap-2">
                  Track Your Parcel <ArrowRight size={23} />
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
              className="h-[300px] sm:h-[500px] lg:h-[600px] w-auto object-cover sm:ml-0"
              src={ImageLight}
              alt="Delivery"
            />
          </motion.div>
        </div>

        {/* Input Section with Button on the Right */}

        <div className="sm:-mt-20 mt-0 flex  justify-center w-full">
          <motion.div
            className="rounded-lg border p-4 w-[100%] sm:w-[70%] lg:w-[70%] flex flex-col sm:flex-col lg:flex-row  items-center h-46 sm:h-30"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="w-full text-center">
              <h1 className="text-md font-bold sm:my-0 mb-4">
                Track your Perrcel here by Tracking Id
              </h1>
            </div>
            <div className="relative flex sm:justify-start justify-center w-full mb-4 sm:mb-4 lg:mb-0">
              {/* Crosshair Icon inside input */}
              <Crosshair className="absolute left-3   sm:left-7 top-1/2 transform -translate-y-1/2 text-gray-500 ml-auto" />

              {/* Input Field */}
              <input
                onChange={(e) => setTrackingId(e.target.value)}
                value={trackingId}
                type="text"
                placeholder="Track your parcel here"
                className="sm:w-[100%] w-full pl-10 p-5 dark:text-gray-300 text-black rounded-md border focus:outline-none text-center ml-auto"
              />
                <Button
                onClick={handleRedirect}
                className="h-auto  hidden sm:w-30  w-full ml-auto sm:flex items-center gap-2"
              >
                Track Percel <ArrowRight size={23} />
              </Button>
            
            </div>
              <Button
                onClick={handleRedirect}
                className="h-auto sm:hidden sm:w-30  w-full ml-auto flex items-center gap-2"
              >
                Track Percel <ArrowRight size={23} />
              </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
