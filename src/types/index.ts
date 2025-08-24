import type { ComponentType } from "react";

export interface ISidebarItems {
  title: string;
  items: {
    title: string;
    url: string;
    component: ComponentType;
  }[];
}

export type Trole = "ADMIN" | "SENDER" | "RECEIVER" | "DELIVERY_AGENT";
