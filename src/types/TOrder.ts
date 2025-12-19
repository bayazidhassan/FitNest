type TCartItems = {
  name: string;
  price: number;
  image: string;
  quantity: number;
  stock_quantity: number;
  product_id: string;
};

export type TStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
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
  cartItems: TCartItems[];
  totalPrice: number;
  status: TStatus;
  createdAt: string;
  updatedAt: string;
};
