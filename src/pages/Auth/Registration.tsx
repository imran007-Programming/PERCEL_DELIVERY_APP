import { motion } from "framer-motion"; // Import motion for animations
import image from "../../assets/auth_logo/Adobe Express - file.png";
import { RegisterForm } from "@/components/Modules/auth/RegisterForm";

export default function Register() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      {/* Image Section (Right side) */}
      <div className="sm:flex hidden justify-center items-center">
        {/* Add motion to image */}
        <motion.img
          src={image}
          alt="Image"
          className="h-[450px] w-[500px]"
          initial={{ opacity: 0, scale: 0.8 }} // Start off smaller and transparent
          animate={{ opacity: 1, scale: 1 }}    // Fade in and scale up
          transition={{ duration: 0.5 }}        // 0.5 seconds duration
        />
      </div>

      {/* Form Section (Left side) */}
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          {/* <Link to="/" className="flex items-center gap-2 font-medium">
            <Logo />
          </Link> */}
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            {/* Add motion to the form */}
            <motion.div
              initial={{ opacity: 0, y: 50 }} // Start off-screen and transparent
              animate={{ opacity: 1, y: 0 }}  // Fade in and move to position
              transition={{ duration: 0.5 }}   // 0.5 seconds duration
            >
              <RegisterForm />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
