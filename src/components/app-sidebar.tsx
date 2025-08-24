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
import { Link } from "react-router";

import { getSidebarsItems } from "@/util/GenarateSidebars/GenarateSidebars";
import { useUserInfoQuery } from "./Redux/Features/Auth/auth.api";



export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const {data:userInfo}=useUserInfoQuery(undefined)

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
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link to={item.url}>{item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
