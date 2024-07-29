import type { ApiResponse, Meta } from "./apiResponse.interface";
import type { Category } from "./category.interface";
import type { Trademark } from "./trademark.interface";

export interface Product {
  id: number;
  category_id: number;
  trademark_id: number;
  category: {
    id: number,
    name: string,
  };
  trademark: {
    id: number,
    name: string,
    image: string | null,
  };
  name: string;
  image: string;
  size?: string;
  description?: string;
  stock: number;
  extra_props: object;
  price: number;
  sale: boolean;
  sale_price: number;
  design: number;
  applied_price?: number;
}

export interface ProductResponse extends ApiResponse {
  id: number;
  category_id: number;
  trademark_id: number;
  category: {
    id: number,
    name: string,
  };
  trademark: {
    id: number,
    name: string,
    image: string | null,
  };
  name: string;
  image: string;
  size?: string;
  description?: string;
  stock: number;
  extra_props: object;
  price: number;
  sale: boolean;
  sale_price: number;
  design: number;
  applied_price?: number;
}

export interface ProductsResponse extends ApiResponse {
  data: Product[];
  trademarks: Trademark[];
  meta: Meta;
}

export interface ProductOptions {
  categories: Category[],
  trademarks: Trademark[],
}