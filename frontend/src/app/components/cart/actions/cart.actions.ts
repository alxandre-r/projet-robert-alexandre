// actions/cart.actions.ts
import { Product } from '../../../../models/product';

export class AddToCart {
  static readonly type = '[Cart] Add To Cart';
  constructor(public product: Product) {}
}

export class RemoveFromCart {
  static readonly type = '[Cart] Remove From Cart';
  constructor(public productId: number) {}
}

export class ClearCart {
  static readonly type = '[Cart] Clear Cart';
}
