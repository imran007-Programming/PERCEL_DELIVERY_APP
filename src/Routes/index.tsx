import { createBrowserRouter, Navigate } from "react-router";
import App from "@/App";

import Login from "@/pages/Auth/Login";
import Register from "@/pages/Auth/Registration";
import HomePage from "@/pages/HomePage";
import About from "@/pages/About/About";
import Contact from "@/pages/Contact/Contuct";
import Unauthorized from "@/pages/Unauthorize/Unauthorize";

import DashboardLayout from "@/components/ui/Layouts/DashboardLayout";

import { genarateRoutes } from "@/util/GenarateRoutes/GenarateRoutes";
import { adminSidebarItems } from "./AdminSidebarsItems";
import { senderSidebarItems } from "./SenderSidebarItems";
import { role } from "@/Constant/role";
import type { Trole } from "@/types";
import { withAuth } from "@/util/RoleBasedRouteAUTH/WithAuth";
import RecieverPercelInfo from "@/pages/Reciever/RecieverPercelInfo";
import { RecevierSidebarItems } from "./ReceiverSideBarsItems";

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
        Component:Unauthorized, 
        path: "/unauthorized",
      },
       {
    Component: Login,
    path: "/login",
  },
  {
    Component: Register,
    path: "/register",
  },
    ],
  },
  {
    Component: withAuth(DashboardLayout,role.ADMIN as Trole),
    path: "/admin",
    children: [
      { index: true, element: <Navigate to="/admin/analytics" /> },
      ...genarateRoutes(adminSidebarItems),
    ],
  },
    {
    Component: withAuth(DashboardLayout,role.RECEIVER as Trole),
    path: "/receiver",
    children: [
      {index:true,element:<Navigate to="/receiver/dashboard"/>}
       ,...genarateRoutes(RecevierSidebarItems)
    ],
  },
 

   {
    Component: withAuth(DashboardLayout,role.SENDER as Trole),
    path: "/sender",
    children: [
      {index:true, element: <Navigate to="/sender/createPercel" /> },
      ...genarateRoutes(senderSidebarItems),
    ],
  },





   
]);

export default router;
