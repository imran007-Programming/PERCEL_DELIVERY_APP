import { motion } from "framer-motion"; // Import motion for animations
import image from "../../assets/auth_logo/ChatGPT Image Aug 22, 2025, 10_06_11 PM.png";
import { LoginForm } from "@/components/Modules/auth/LoginForm";

export default function Login() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      {/* Form Section (Left side) */}
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          {/* <Link to="/" className="flex items-center gap-2 font-medium">
            <Logo />
          </Link> */}
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            {/* Add motion animation here */}
            <motion.div
              initial={{ opacity: 0, y: 50 }} // Start off-screen and transparent
              animate={{ opacity: 1, y: 0 }}  // Fade in and move to position
              transition={{ duration: 0.5 }}   // 0.5 seconds duration
            >
              <LoginForm />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Image Section (Right side) */}
      <div className="flex justify-center items-center">
        <motion.img
          src={image}
          alt="Image"
          className="h-[550px] w-[600px]"
          initial={{ opacity: 0, scale: 0.8 }} // Start smaller and transparent
          animate={{ opacity: 1, scale: 1 }}    // Fade in and scale to normal size
          transition={{ duration: 0.5 }}        // 0.5 seconds duration
        />
      </div>
    </div>
  );
}
