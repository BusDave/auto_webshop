import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductListComponent } from './components/termekek/termekek.component';
//import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { CartComponent } from './components/kosar/kosar.component';
import { CheckoutComponent } from './components/fizetes/fizetes.component';
import { AdminComponent } from './components/admin/admin.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' }, 
    { path: 'home', component: HomeComponent },
    { path: 'termekek', component: ProductListComponent },
   // { path: 'products/:id', component: ProductDetailComponent },
   { path: 'kosar', component: CartComponent },

    { path: 'fizetes', component: CheckoutComponent },
    { path: 'admin', component: AdminComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'signup', component: SignupComponent }, 
    { path: 'login', component: LoginComponent }
];
