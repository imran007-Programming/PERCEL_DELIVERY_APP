import { useUserInfoQuery } from "@/components/Redux/Features/Auth/auth.api";
import type { Trole } from "@/types";

import type { ComponentType } from "react";

import { Navigate } from "react-router";

export const withAuth = (Component: ComponentType, requiredRole?: Trole) => {
  return function AuthWrapper() {
    const { data, isLoading } = useUserInfoQuery(undefined);

    if(isLoading){
      return <p>Loading.....</p>
    }


    if (!data?.data?.email) {
      return <Navigate to="/login" replace />;
    }

    if (requiredRole && requiredRole !== data?.data?.role) {
      return <Navigate to="/unauthorized" />;
    }

    return <Component />;
  };
};
