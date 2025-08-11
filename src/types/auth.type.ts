import type { ComponentType } from "react";

export interface ISendOtp {
  email: string;
}

export interface IVerifyOtp {
  email: string;
  otp: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface ISidebarItems {
  title: string,
  items: {
    title: string,
    url: string,
    component: ComponentType
  }[]
}