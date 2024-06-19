// states/cart.state.ts
import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { ProductBase } from '../types/productBase';
import { AddToCart, RemoveFromCart, ClearCart } from '../actions/cart.actions';

export interface CartStateModel {
  items: ProductBase[];
}

  @State<CartStateModel>({
    name: 'cart',
    defaults: {
      items: []
    }
  })
  @Injectable()
  export class CartState {
  
  
    @Selector()
      static getCartProducts(state: CartStateModel) {
          return state.items;
      }
  
      @Selector()
      static getCartTotalPrice(state: CartStateModel){
          return state.items.reduce((total, productWrapper) => {
              return total + (Number(productWrapper.product.price) * productWrapper.quantity);
            }, 0);
      }
  
      @Selector()
      static getCartTotalItems(state: CartStateModel){
          return state.items.length;
      }
  
      @Action(AddToCart)
      addToCart(ctx: StateContext<CartStateModel>, action: AddToCart) {
          const state = ctx.getState();
          console.log('cart.state.ts : AddToCart action:');
          console.log(action.product);
          const baseProduct: ProductBase = {
              product: action.product,
              quantity: 1,
              id: state.items.length + 1
          };

          ctx.patchState({
              items: [...state.items, baseProduct]
          });
      }

      @Action(RemoveFromCart)
      removeFromCart(ctx: StateContext<CartStateModel>, action: RemoveFromCart) {
          const state = ctx.getState();
          const productToRemove = state.items.find(item => Number(item.product.id) === Number(action.productId));
          if (productToRemove) {
              ctx.setState({
                  items: state.items.filter(item => item !== productToRemove)
              });
          }
      }
  
      @Action(ClearCart)
      clearCart(ctx: StateContext<CartStateModel>){
          ctx.setState({ items: [] });
      }
  }
  export { AddToCart }; 