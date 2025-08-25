import { role } from "@/Constant/role";
import { adminSidebarItems } from "@/Routes/AdminSidebarsItems";
import { RecevierSidebarItems } from "@/Routes/ReceiverSideBarsItems";
import { senderSidebarItems } from "@/Routes/SenderSidebarItems";
import type { Trole } from "@/types";

export const getSidebarsItems = (userRole: Trole) => {


  switch (userRole) {
    case role.ADMIN:
      return [...adminSidebarItems];
    case role.SENDER:
      return [...senderSidebarItems];
    case role.RECEIVER:
      return [...RecevierSidebarItems];
    default:
      console.warn(`Unexpected role: ${userRole}`);
      return [];
  }
};
