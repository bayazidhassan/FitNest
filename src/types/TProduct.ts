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

export type TProductCategories = {
  _id: string;
  category: string;
};

export type GetProductsResponse = {
  success: boolean;
  message: string;
  data: TProduct[];
};

export type GetProductResponse = {
  success: boolean;
  message: string;
  data: TProduct;
};
