import { AuthStateType } from "@/context/AuthContext";

export type Role = "ADMIN" | "USER" | "EMPLOYEE";
export interface User {
  id: string;
  name: string;
  slug?: string;
  email: string;
  phone?: string;
  profileImg?: string;
  password?: string;
  passwordChangedAt?: Date;
  passwordResetCode?: string;
  passwordResetExpires?: number;
  passwordResetVerified?: boolean;
  role?: Role;
  active?: boolean;
  wishlist?: string;
  addresses?: {
    _id: string;
    alias: string;
    details: string;
    phone: string;
    city: string;
    postalCode: string;
  }[];
  createdAt?: Date;
  updatedAt?: Date;
  __v: number;
}

/////////////////////////////// NOTE: Services
export interface Response {
  status: "success" | "fail";
  message?: string;
  results?: number;
  limit?: number;
  currentPage?: number;
  numberOfPages?: number;
  next?: number;
}

export interface UserResponse extends Response {
  token: string;
  data: User;
}

export interface Register {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
  phone: string;
}
export interface RegisterProps {
  userData: Register;
  setState: React.Dispatch<React.SetStateAction<AuthStateType>>;
}
