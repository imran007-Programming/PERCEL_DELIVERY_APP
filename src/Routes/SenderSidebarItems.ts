import CreateAPercel from "@/pages/Sender/CreateAPercel";
import type { ISidebarItems } from "@/types";
import CheckStatus from "@/pages/Sender/GetAllPercel";

export const senderSidebarItems: ISidebarItems[] = [
  {
    title: "Dashboard",

    items: [
      {
        title: "Create A Percel",
        url: "/sender/createPercel",
        component: CreateAPercel,
      },
      {
        title: "Check Percel Status",
        url: "/sender/getallpercel",
        component: CheckStatus,
      },
    ],
  },
];
