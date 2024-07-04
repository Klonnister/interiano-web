import type { Meta } from "./product.interface";

export interface Category {
  id: number,
  name: string,
}

export interface CategoryResponse {
  id: number,
  name: string,
  statusCode?: number,
}

export interface CategoriesResponse {
  data: Category[];
  meta: Meta;
  statusCode?: number;
}