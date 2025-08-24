
import CreateAPercel from "@/pages/Sender/CreateAPercel";
import SenderAnalytics from "@/pages/Sender/SenderAnalytics";
import type { ISidebarItems } from "@/types";

export const senderSidebarItems:ISidebarItems[]=[
    {
      title: "Dashboard",
  
      items: [
        {
          title: "Analytics",
          url: "/sender/analytics",
          component:SenderAnalytics
        },
        {
          title: "Create A Percel",
          url: "/sender/createPercel",
          component:CreateAPercel
        },
      ],
    },
   
   
 
    
  ]