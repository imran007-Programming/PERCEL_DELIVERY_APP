import { useUserInfoQuery } from "@/components/Redux/Features/Auth/auth.api";
import loaderJson from "../../assets/lottie/Forklift loading truck.json"
import LottieLoader from "@/shared/lotttieAnimation";
import type { Trole } from "@/types";

import type { ComponentType } from "react";

import { Navigate } from "react-router";

export const withAuth = (Component: ComponentType, requiredRole?: Trole) => {
  return function AuthWrapper() {
    const { data, isFetching } = useUserInfoQuery(undefined);

    if (isFetching) {
      return (
      <LottieLoader
        animationData={loaderJson}
        size={150}
        ariaLabel="Loading app..."
      />)
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
