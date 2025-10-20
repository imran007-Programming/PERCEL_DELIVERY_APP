import verification from "../../assets/lottie/Verification Code - OTP V2.json";
import { LoginForm } from "@/components/Modules/auth/LoginForm";
import Logo from "@/assets/Logo/Logo";
import { Link } from "react-router";
import Lottie from "lottie-react";

export default function Login() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-950 px-4 pt-19 ">
      {/* Card Container */}
      <div className="grid w-full max-w-5xl overflow-hidden rounded-2xl shadow-2xl bg-white dark:bg-gray-900 lg:grid-cols-2 my-6">
        {/* Left Side: Form Section */}
        <div className="flex flex-col justify-center px-8 sm:px-12 py-12">
          {/* Logo */}
          <div className="flex justify-center lg:justify-start mb-6">
            <Link to="/" className="flex items-center gap-2 font-medium">
              <Logo />
            </Link>
          </div>

          {/* Headings */}
          <div className="flex flex-col items-center lg:items-start gap-3 mb-6">
            <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">
              Welcome Back
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-center lg:text-left">
              Log in to manage your parcels and track deliveries easily.
            </p>
          </div>

          {/* Login Form */}
          <div className="flex flex-1 items-center justify-center">
            <div className="w-full max-w-md">
              <LoginForm />
            </div>
          </div>
        </div>

        {/* Right Side: Image Section */}
        <div className="hidden lg:flex justify-center items-center bg-gray-50 dark:bg-gray-800">
          <Lottie animationData={verification}/>
        </div>
      </div>
    </div>
  );
}
