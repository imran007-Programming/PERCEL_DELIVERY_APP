
import type { ISidebarItems } from "@/types"


export const genarateRoutes=(sidebarItems:ISidebarItems[])=>{
  return sidebarItems.flatMap((section)=>section.items.map((route)=>({
    path:route.url,
    Component:route.component
  })))
}