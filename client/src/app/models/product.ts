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

export interface ProductParams {
  sortBy: string;
  searchTerm?: string;
  types?: string[];
  brands?: string[];
  pageNumber: number;
  pageSize: number;
}