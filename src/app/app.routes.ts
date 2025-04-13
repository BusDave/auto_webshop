import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
////import { ProductListComponent } from './components/termekek/termekek.component';
//import { ProductDetailComponent } from './components/product-detail/product-detail.component';
//import { CartComponent } from './components/cart/cart.component';
//import { CheckoutComponent } from './components/checkout/checkout.component';
//import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' }, 
    { path: 'home', component: HomeComponent },
  //  { path: 'products', component: ProductListComponent },
   // { path: 'products/:id', component: ProductDetailComponent },
    //{ path: 'cart', component: CartComponent },
   // { path: 'checkout', component: CheckoutComponent },
   // { path: 'admin', component: AdminPanelComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'signup', component: SignupComponent }, 
    { path: 'login', component: LoginComponent }
];
