import type { ApiResponse, Meta } from "./apiResponse.interface";

export interface Category {
  id: number,
  name: string,
}

export interface CategoryResponse extends ApiResponse {
  id: number,
  name: string,
}

export interface RawCategoriesResponse extends ApiResponse {
  data: Category[];
}

export interface CategoriesResponse extends ApiResponse {
  data: Category[];
  meta: Meta;
}