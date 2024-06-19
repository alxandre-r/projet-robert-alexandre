import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/signup/signup.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductComponent } from './components/product/product.component'; 
import { ProductListComponent } from './components/product-list/product-list.component';

export const routes: Routes = [
    { path: '', redirectTo: '/product-list', pathMatch: 'full'},
    { path: 'product-list', component: ProductListComponent},

    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignUpComponent },
    { path: 'cart', component: CartComponent },
    { path: 'product/:id', component: ProductComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
