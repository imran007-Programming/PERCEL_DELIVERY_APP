import type { ComponentType } from "react";

export interface ISidebarItems {
  title: string;
  items: {
    title: string;
    url: string;
    component: ComponentType;
    icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  }[];
}
export interface IPercel {
  weight: Weight;
  _id: string;

  senderInfo: string;
  reciverInfo: string;
  percelType: string;
  receiverAddress: string;
  trackingId: string;
  fee: number;
  isPaid: boolean;
  isConfirm: boolean;
  currentLocation: string;
  trackingEvents: TrackingEvent[];
  dispatchLocation: string;
  pickupAddress: string;
  createdAt: string;
  updatedAt: string;
  meta:{
    totalPage:number
  }
}

export interface Weight {
  value: number;
  unit: string;
}

export interface TrackingEvent {
  status: string;
  location: string;
  note: string;
  timestamp: string;
}
/* errror */
export interface IError {
  data: {
    message: string;
  };
}

export type Trole = "ADMIN" | "SENDER" | "RECEIVER" | "DELIVERY_AGENT";

export interface IUser {
  _id: string
  name: string
  email: string
  role: string
  phone: string
  address: string
  isDeleted: boolean
  isActive: string
  isVerified: boolean
  auths: []
  createdAt: string
  updatedAt: string
}

