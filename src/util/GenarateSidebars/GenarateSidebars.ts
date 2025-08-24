import { role } from "@/Constant/role";
import { adminSidebarItems } from "@/Routes/AdminSidebarsItems";
import { senderSidebarItems } from "@/Routes/SenderSidebarItems";
import type { Trole } from "@/types";

export const getSidebarsItems = (userRole: Trole) => {


  switch (userRole) {
    case role.ADMIN:
      return [...adminSidebarItems];
    case role.SENDER:
      return [...senderSidebarItems];
    default:
      console.warn(`Unexpected role: ${userRole}`);
      return [];
  }
};
