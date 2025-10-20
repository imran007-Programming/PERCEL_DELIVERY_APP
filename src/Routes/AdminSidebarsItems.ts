
import AdminChatList from "@/pages/Admin/AdminChatList";
import AllPercel from "@/pages/Admin/AllPercel";
import AllUser from "@/pages/Admin/AllUser";
import Analytics from "@/pages/Admin/Analytics";
import type { ISidebarItems } from "@/types";
import { ArrowRightFromLine, Grid2x2, MessageCircleHeart, Paperclip } from "lucide-react";

export const adminSidebarItems:ISidebarItems[]=[
    {
      title: "Dashboard",
  
      items: [
        {
          title: "Analytics",
          url: "/admin/analytics",
          component:Analytics,
          icon:Grid2x2
        },
        {
          title: "ALL User",
          url: "/admin/alluser",
          component:AllUser,
          icon:ArrowRightFromLine
        },
        {
          title: "ALL Percel",
          url: "/admin/allpercel",
          component:AllPercel,
          icon:Paperclip

        },
        {
          title: "Chat with customer",
          url: "/admin/chat",
          component:AdminChatList,
          icon:MessageCircleHeart

        },
      ],
    },
   
   
 
    
  ]