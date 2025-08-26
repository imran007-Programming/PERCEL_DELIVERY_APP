import { useState } from "react";
import Logo from "@/assets/Logo/Logo"; // Import your logo here
import { ModeToggle } from "./Mode.toggler";
import { motion } from "framer-motion";
import { Link } from "react-router";
import {
  authApi,
  useLogoutMutation,
  useUserInfoQuery,
} from "@/components/Redux/Features/Auth/auth.api";

import { useDispatch } from "react-redux";
import { role } from "@/Constant/role";

const Navbar = () => {
  const [logout] = useLogoutMutation();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data } = useUserInfoQuery(undefined);

  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      await logout(undefined);
      dispatch(authApi.util.resetApiState());
    } catch (error) {
      console.log(error);
    }
  };

  const menuItems = [
    { title: "Home", url: "/", role: "PUBLIC" },
    { title: "About", url: "/about", role: "PUBLIC" },
    { title: "Contact", url: "/contact", role: "PUBLIC" },
    { title: "Dashboard", url: "/admin", role: role.ADMIN },
    { title: "Dashboard", url: "/sender", role: role.SENDER },
    { title: "Dashboard", url: "/receiver", role: role.RECEIVER },
  ];

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <motion.nav
      className="shadow-md bg-white dark:bg-gray-900 fixed top-0 right-0 left-0 z-50"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-screen-xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <div className="flex justify-between items-center gap-2">
            <Logo />
            <p className="text-xl font-bold italic">
              FastTrack{" "}
              <strong className="text-pretty text-primary">Delivery</strong>
            </p>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          {menuItems.map((item, index) => (
            // Place the key here on the outer div to avoid key duplication errors
            <>
              {item.role === "PUBLIC" && (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.3 }}
                >
                  <Link to={item.url}>{item.title}</Link>
                </motion.div>
              )}
              {item.role === data?.data?.role && (
                <motion.div
                key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.3 }}
                >
                  <Link to={item.url}>{item.title}</Link>
                </motion.div>
              )}
            </>
          ))}
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex space-x-4">
          {data?.data?.email && (
            <motion.button
              className="px-4  py-2 bg-primary text-white rounded-md dark:bg-primary dark:text-white"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
              onClick={handleLogout}
            >
              Logout
            </motion.button>
          )}

          {!data?.data?.email && (
            <motion.button
              className="px-4  py-2 bg-primary text-white rounded-md dark:bg-primary dark:text-white"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link to="/login">Login</Link>
            </motion.button>
          )}

          <motion.button
            className="px-4 py-2 border border-primary text-primary rounded-md dark:bg-primary dark:text-white dark:border-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Link to="/register">Sign Up</Link>
          </motion.button>
          <ModeToggle />
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center">
          <motion.button
            onClick={handleMobileMenuToggle}
            className="text-gray-700"
            initial={{ rotate: 0 }}
            animate={{
              rotate: isMobileMenuOpen ? 180 : 0,
              transition: { duration: 0.3 },
            }}
          >
            <motion.div
              className="w-6 h-0.5 bg-gray-700 mb-1"
              initial={{ rotate: 0 }}
              animate={{
                rotate: isMobileMenuOpen ? 45 : 0,
                translateY: isMobileMenuOpen ? 4 : 0, // Move down to form the cross
                transition: { duration: 0.3 },
              }}
            />
            <motion.div
              className="w-6 h-0.5 bg-gray-700 mb-1"
              initial={{ rotate: 0 }}
              animate={{
                opacity: isMobileMenuOpen ? 0 : 1, // Fade out the middle bar when the menu is open
                transition: { duration: 0.3 },
              }}
            />
            <motion.div
              className="w-6 h-0.5 bg-gray-700 mt-1"
              initial={{ rotate: 0 }}
              animate={{
                rotate: isMobileMenuOpen ? -45 : 0,
                translateY: isMobileMenuOpen ? -4 : 0, // Move up to form the cross
                transition: { duration: 0.3 },
              }}
            />
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          className="md:hidden p-4 space-y-4"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {menuItems.map((item, index) => (
            <div key={index}>
              {item.role === "PUBLIC" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.3 }}
                >
                  <Link to={item.url}>{item.title}</Link>
                </motion.div>
              )}
              {item.role === data?.data?.role && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.3 }}
                >
                  <Link to={item.url}>{item.title}</Link>
                </motion.div>
              )}
            </div>
          ))}

          <div className="space-y-4">
            <motion.button
              className="block w-full px-4 py-2 bg-primary text-white rounded-md dark:bg-primary dark:text-white"
              onClick={() => setMobileMenuOpen(false)} // Close menu after item click
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link to="/login">Login</Link>
            </motion.button>
            <button
              className="block w-full px-4 py-2 rounded-md text-white bg-primary"
              onClick={() => setMobileMenuOpen(false)} // Close menu after item click
            >
              <Link to="/register">Sign Up</Link>
            </button>
            <ModeToggle />
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
