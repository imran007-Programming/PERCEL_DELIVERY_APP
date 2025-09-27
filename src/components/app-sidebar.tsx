import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Logo from "@/assets/Logo/Logo";
import { Link, useLocation } from "react-router";

import { getSidebarsItems } from "@/util/GenarateSidebars/GenarateSidebars";
import { useUserInfoQuery } from "./Redux/Features/Auth/auth.api";
import { cn } from "@/lib/utils";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: userInfo } = useUserInfoQuery(undefined);
  const location = useLocation();
  // This is sample data.
  const data = {
    navMain: getSidebarsItems(userInfo?.data?.role),
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <Link to="/">
          <div className="flex justify-between items-center gap-2">
            <Logo />
            <p className="text-xl font-bold italic">
              FastTrack{" "}
              <strong className="text-pretty text-primary">Delivery</strong>
            </p>
          </div>
        </Link>
 
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <SidebarGroup  key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-5 mt-5">
                {item.items.map((item) => {
                  const isActive = location.pathname === item.url;

                  return (
                    // Add return statement here
                    <SidebarMenuItem
                      className="flex ml-3 justify-center items-center gap-x-2" 
                      key={item.title}
                    >
                     {item.icon &&  <item.icon color="red" />}
                      <SidebarMenuButton
                      
                        asChild
                        className={cn(
                          isActive && "bg-primary rounde-none  text-40",
                      
                         
                        )}
                      >
                        <Link to={item.url}>{item.title}</Link>
                      </SidebarMenuButton>
                    
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
           
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
           {/* <button className="bg-primary p-5 ">Logout</button> */}
    </Sidebar>
  );
}
