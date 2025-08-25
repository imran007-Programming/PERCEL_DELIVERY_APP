import CreateAPercel from "@/pages/Sender/CreateAPercel";
import type { ISidebarItems } from "@/types";
import CheckStatus from "@/pages/Sender/GetAllPercel";
import { CopyCheck, Grid2x2 } from "lucide-react";

export const senderSidebarItems: ISidebarItems[] = [
  {
    title: "Dashboard",

    items: [
      {
        title: "Create A Percel",
        url: "/sender/createPercel",
        component: CreateAPercel,
        icon:Grid2x2 
      },
      {
        title: "All Percel",
        url: "/sender/getallpercel",
        component: CheckStatus,
        icon:CopyCheck 
      },
    ],
  },
];
