import ReceiverDashBoard from "@/pages/Reciever/ReceiverDashBoard";
import RecieverPercelInfo from "@/pages/Reciever/RecieverPercelInfo";

import type { ISidebarItems } from "@/types";
import { CirclePlus, Grid2x2 } from "lucide-react";


export const RecevierSidebarItems: ISidebarItems[] = [
  {
    title: "Dashboard",

    items: [
      {
        title: "Dashboard",
        url: "/receiver/dashboard",
        component: ReceiverDashBoard,
        icon:Grid2x2,
        
      },
      {
        title: "Get Percel Information",
        url: "/receiver/getpercelinfo",
        component: RecieverPercelInfo,
        icon:CirclePlus 
      },
    //   {
    //     title: "Check Percel Status",
    //     url: "/sender/getallpercel",
    //     component: CheckStatus,
    //   },
    ],
  },
];
