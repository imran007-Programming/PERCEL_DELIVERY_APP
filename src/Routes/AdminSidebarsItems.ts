import AllUser from "@/pages/Admin/AllUser";
import Analytics from "@/pages/Admin/Analytics";
import type { ISidebarItems } from "@/types";

export const adminSidebarItems:ISidebarItems[]=[
    {
      title: "Dashboard",
  
      items: [
        {
          title: "Analytics",
          url: "/admin/analytics",
          component:Analytics
        },
        {
          title: "ALL User",
          url: "/admin/alluser",
          component:AllUser
        },
      ],
    },
   
   
 
    
  ]