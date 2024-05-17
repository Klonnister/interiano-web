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
