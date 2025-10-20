import { useState } from "react";
import Logo from "@/assets/Logo/Logo";

import { motion } from "framer-motion";
import { Link } from "react-router";
import {
  authApi,
  useLogoutMutation,
  useUserInfoQuery,
} from "@/components/Redux/Features/Auth/auth.api";

import { useDispatch } from "react-redux";
import { role } from "@/Constant/role";
import { AnimatedThemeToggler } from "../animated-theme-toggler";

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
    { title: "Our Covarage", url: "/location", role: "PUBLIC" },
    { title: "Dashboard", url: "/admin", role: role.ADMIN },
    { title: "Dashboard", url: "/sender", role: role.SENDER },
    { title: "Dashboard", url: "/receiver", role: role.RECEIVER },
  ];

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <motion.nav
      className=" 
      shadow-md bg-white dark:bg-[#020618] fixed top-0 right-0 left-0 z-[9999]"
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
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link
                className="px-4  py-2 bg-primary text-white dark:bg-primary dark:text-white"
                to="/login"
              >
                Login
              </Link>
            </motion.button>
          )}
          {!data?.data?.email && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link
                className="px-4 py-2 border border-primary text-primary  dark:bg-primary dark:text-white dark:border-primary"
                to="/register"
              >
                Sign Up
              </Link>
            </motion.button>
          )}
          {/* <ModeToggle /> */}
          <AnimatedThemeToggler />
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center">
          <motion.button
            onClick={handleMobileMenuToggle}
            className="relative flex flex-col justify-center items-center w-12 h-12 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition" 
            initial={{ rotate: 0 }}
            animate={{
              rotate: isMobileMenuOpen ? 180 : 0,
              transition: { duration: 0.3 },
            }}
          >
            <motion.div
              className="w-6 h-0.5 bg-gray-700 dark:bg-gray-200 mb-1"
              initial={{ rotate: 0 }}
              animate={{
                rotate: isMobileMenuOpen ? 40 : 0,
                translateY: isMobileMenuOpen ? 7 : 0,
                transition: { duration: 0.7 },
              }}
            />
            <motion.div
              className="w-6 h-0.5 bg-gray-700 dark:bg-gray-200 mb-1"
              initial={{ rotate: 0 }}
              animate={{
                opacity: isMobileMenuOpen ? 0 : 1,
                transition: { duration: 0.3 },
              }}
            />
            <motion.div
              className="w-6 h-0.5 bg-gray-700 dark:bg-gray-200 mt-1"
              initial={{ rotate: 0 }}
              animate={{
                rotate: isMobileMenuOpen ? -45 : 0,
                translateY: isMobileMenuOpen ? -4 : 0,
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
            {/* Auth Buttons */}
            <div className=" md:flex space-x-4">
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
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link
                    className="px-4  py-2 bg-primary text-white rounded-md dark:bg-primary dark:text-white"
                    to="/login"
                  >
                    Login
                  </Link>
                </motion.button>
              )}

              {!data?.data?.email && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link
                    className="px-4 py-2 border border-primary text-primary rounded-md dark:bg-primary dark:text-white dark:border-primary"
                    to="/register"
                  >
                    Sign Up
                  </Link>
                </motion.button>
              )}
              {/* <ModeToggle /> */}
              <AnimatedThemeToggler />
            </div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
