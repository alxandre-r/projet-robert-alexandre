import { Component } from '@angular/core';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {

calculateTotal() {
  let total = 0;
  // this.cart.forEach(item => {
  //   total += item.price;
  // });
  return total;
  } 
}
