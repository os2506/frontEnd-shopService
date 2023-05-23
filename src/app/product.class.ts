export class Product {
  id?:number;
  code?:string;
  name?:string;
  description?:string;
  image?:string;
  price?:number;
  category?:string;
  quantity?:number;
  rating?:number;
  inventoryStatus?:string;
  selected: unknown;
}

export interface ProductPayload {
  products: Product[];
  total: number;
}