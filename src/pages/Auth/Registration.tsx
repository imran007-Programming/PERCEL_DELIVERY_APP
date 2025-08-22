
import image from "../../assets/auth_logo/Adobe Express - file.png"


import { RegisterForm } from "@/components/Modules/auth/RegisterForm"
export default function Register() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      {/* Image Section (Right side) */}
      <div className="sm:flex hidden justify-center items-center">
        <img
          src={image}
          alt="Image"
          className="h-[350px] w-[400px]"
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
            <RegisterForm />
          </div>
        </div>
      </div>
    </div>
  );
}
