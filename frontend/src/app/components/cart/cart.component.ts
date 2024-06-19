import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Select, Store } from '@ngxs/store';
import { CartState } from '../cart/state/cart.state';
import { Observable } from 'rxjs';
import { ProductBase } from '../cart/types/productBase';
import { ClearCart, RemoveFromCart } from './actions/cart.actions';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  @Select(CartState.getCartProducts) products!: Observable<ProductBase[]>;
  @Select(CartState.getCartTotalPrice) totalPrice$!: Observable<number>;
  @Select(CartState.getCartTotalItems) totalItems!: Observable<number>;

  isEmpty: boolean = true;
  showPopup: boolean = false;
  isLoggedIn: boolean = false;
  popupMessage: string = '';
  totalPrice: number = 0;

  constructor(private store: Store, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.products.subscribe(products => {
      this.isEmpty = products.length === 0;
    });

    this.totalPrice$.subscribe(price => {
      console.log(`Total Price: ${price}`);
      this.totalPrice = price;
    });

    this.authService.isLoggedIn().subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
    });
  }

  removeFromCart(productId: number) {
    console.log('cart.component.ts : removeFromCart()');
    this.store.dispatch(new RemoveFromCart(productId));
  }

  clearCart() {
    this.store.dispatch(new ClearCart());
  }

  handlePurchase() {
    if (this.isLoggedIn) {
      this.popupMessage = 'Not implemented';
    } else {
      this.popupMessage = 'Please login to proceed with your purchase.';
    }
    this.showPopup = true;
  }

  redirectToLogin() {
    this.router.navigate(['login']);
    this.showPopup = false;
  }

  closePopup() {
    this.showPopup = false;
  }
}