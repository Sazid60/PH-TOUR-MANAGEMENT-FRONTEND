export type { ISendOtp, IVerifyOtp, ILogin, ISidebarItems, TRole } from "./auth.type";

export interface IResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
}