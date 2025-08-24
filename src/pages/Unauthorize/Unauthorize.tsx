import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function Unauthorized() {
  return (
    <div className="h-screen  flex justify-center items-center">
      <div className="text-center bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h1 className="text-3xl font-semibold text-red-600">403 - Forbidden</h1>
        <p className="text-gray-600 mt-4">
          You do not have permission to access this page.
        </p>

         <Button className="bg-primary"><Link
          to="/"
          className=""
        >
          Go to Home
        </Link></Button>
        
      </div>
    </div>
  );
}
