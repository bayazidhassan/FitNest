export type TProduct = {
  _id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  stock_quantity: number;
  images: string[];
  isDeleted: boolean;
};
