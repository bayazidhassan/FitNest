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

export interface GetProductsResponse {
  success: boolean;
  message: string;
  data: TProduct[];
}

export interface GetProductResponse {
  success: boolean;
  message: string;
  data: TProduct;
}
