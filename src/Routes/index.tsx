import { createBrowserRouter, Navigate } from "react-router";
import { lazy } from "react";
import App from "@/App";

// Lazy loading the pages
const Login = lazy(() => import("@/pages/Auth/Login"));
const Register = lazy(() => import("@/pages/Auth/Registration"));
const HomePage = lazy(() => import("@/pages/HomePage"));
const About = lazy(() => import("@/pages/About/About"));
const Contact = lazy(() => import("@/pages/Contact/Contuct"));
const Unauthorized = lazy(() => import("@/pages/Unauthorize/Unauthorize"));
const NotFound = lazy(() => import("@/pages/NotFound/NotFound")); 

const DashboardLayout = lazy(() => import("@/components/ui/Layouts/DashboardLayout"));
const TrackinPercel = lazy(() => import("@/pages/TrackinPercel/TrackinPercel"));

import { genarateRoutes } from "@/util/GenarateRoutes/GenarateRoutes";
import { adminSidebarItems } from "./AdminSidebarsItems";
import { senderSidebarItems } from "./SenderSidebarItems";
import { role } from "@/Constant/role";
import { withAuth } from "@/util/RoleBasedRouteAUTH/WithAuth";
import { RecevierSidebarItems } from "./ReceiverSideBarsItems";
import type { Trole } from "@/types";

// Define the routes with CommonLayouts wrapping Login and Register components
const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
    children: [
      {
        Component: HomePage,
        index: true,
      },
      {
        Component: About,
        path: "/about",
      },
      {
        Component: Contact,
        path: "/contact",
      },
      {
        Component: Unauthorized, 
        path: "/unauthorized",
      },
      {
        Component: TrackinPercel, 
        path: "/track/:trackingId",
      },
      {
        Component: Login,
        path: "/login",
      },
      {
        Component: Register,
        path: "/register",
      },
      {
 
    Component: NotFound,
    path: "*",
  },
    ],
  },
  {
    Component: withAuth(DashboardLayout, role.ADMIN as Trole),
    path: "/admin",
    children: [
      { index: true, element: <Navigate to="/admin/analytics" /> },
      ...genarateRoutes(adminSidebarItems),
    ],
  },
  {
    Component: withAuth(DashboardLayout, role.RECEIVER as Trole),
    path: "/receiver",
    children: [
      { index: true, element: <Navigate to="/receiver/dashboard" /> },
      ...genarateRoutes(RecevierSidebarItems),
    ],
  },
  {
    Component: withAuth(DashboardLayout, role.SENDER as Trole),
    path: "/sender",
    children: [
      { index: true, element: <Navigate to="/sender/createPercel" /> },
      ...genarateRoutes(senderSidebarItems),
    ],
  },
  
]);

export default router;
