import Lottie from "lottie-react";
import { RegisterForm } from "@/components/Modules/auth/RegisterForm";
import percelTaking from "../../assets/lottie/Delivery boy animation.json"

export default function Register() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-950 px-4">
      {/* Card Container */}
      <div className="grid w-full max-w-5xl overflow-hidden rounded-2xl shadow-2xl bg-white dark:bg-gray-900 lg:grid-cols-2">
        {/* Left Side: Image Section */}
        <div className="hidden lg:flex justify-center items-center bg-gray-50 dark:bg-gray-800">
         <Lottie animationData={percelTaking}/>
        </div>

        {/* Right Side: Form Section */}
        <div className="flex flex-col justify-center px-8 sm:px-12 py-12">
          <div className="flex flex-col items-center lg:items-start gap-3 mb-6">
            <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">
              Create Your Account
            </h1>
          
          </div>

          <div className="flex flex-1 items-center justify-center">
            <div className="w-full max-w-md">
              <RegisterForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
