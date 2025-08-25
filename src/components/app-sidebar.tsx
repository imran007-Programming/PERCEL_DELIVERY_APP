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
        {/* <VersionSwitcher
          versions={data.versions}
          defaultVersion={data.versions[0]}
        />
        <SearchForm /> */}
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => {
                  const isActive = location.pathname === item.url;

                  return (
                    // Add return statement here
                    <SidebarMenuItem
                      className="flex justify-center items-center gap-x-5 gap-y-5" // Adjust the gap between icon and link
                      key={item.title}
                    >
                      <item.icon color="red" />
                      <SidebarMenuButton
                        isActive={isActive}
                        asChild
                        className={cn(
                          isActive && "bg-red-600",
                      
                         
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
    </Sidebar>
  );
}
