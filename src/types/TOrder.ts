import type { TCartItem } from "../redux/features/cart/addToCartSlice";

export type TStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "returned"
  | "delivered"
  | "cancelled";

export type TOrder = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  street_address: string;
  upazila: string;
  district: string;
  comment?: string;
  cartItems: TCartItem[];
  totalPrice: number;
  isAlreadyPaid: boolean;
  status: TStatus;
  createdAt: string;
  updatedAt: string;
};
