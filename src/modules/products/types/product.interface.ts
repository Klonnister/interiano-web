export interface Product {
  id: number;
  category_id: number;
  trademark_id: number;
  category: string;
  trademark: string;
  title: string;
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
