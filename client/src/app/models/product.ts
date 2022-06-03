export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  quantityInStock?: number;
  picUrl: string;
  brand: string;
  type?: string
}