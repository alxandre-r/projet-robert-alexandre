// Inside checkout.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Select, Store } from '@ngxs/store';
import { CartState } from '../cart/state/cart.state';
import { Observable } from 'rxjs';
import { ProductBase } from '../cart/types/productBase';
import { ClearCart, RemoveFromCart } from './actions/cart.actions';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  @Select(CartState.getCartProducts) products!: Observable<ProductBase[]>;
  @Select(CartState.getCartTotalPrice) totalPrice!: Observable<number>;
  @Select(CartState.getCartTotalItems) totalItems!: Observable<number>;

  constructor(private store: Store) { 
  }

  ngOnInit() {

    this.products.subscribe(products => console.log(products));

    console.log('cart.component : subscribe oninit : ');
    console.log(this.products);
  }

  removeFromCart(productId: number) {
    this.store.dispatch(new RemoveFromCart(productId));
  }

  clearCart() {
    this.store.dispatch(new ClearCart());
  }
}
