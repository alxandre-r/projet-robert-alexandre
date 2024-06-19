import { Product } from "../../../../models/product";

export interface ProductBase {
    product: Product;
    quantity: number;
    id : number;
}