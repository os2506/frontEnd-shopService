import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ProductsComponent } from './products/products.component';
import { LogInComponent } from './log-in/log-in.component';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';
import { RecoverpasswordFormComponent } from './recoverpassword-form/recoverpassword-form.component';
import { FooterComponent } from './footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { WishListComponent } from './wish-list/wish-list.component';
import { ProductCreateComponent } from './product-create/product-create.component';
import { CartComponent } from './cart/cart.component';
import { RegisterComponent } from './register/register.component';
import { RegistrationSuccessComponent } from './registration-success/registration-success.component';

const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: 'about', component: AboutComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'log-in', component: LogInComponent },
  { path: 'recover', component: RecoverPasswordComponent },
  { path: 'pwdrecover', component: RecoverpasswordFormComponent },
  { path: 'footer', component: FooterComponent },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'wishList', component: WishListComponent },
  { path: 'createProduct', component: ProductCreateComponent },
  { path: 'cart', component: CartComponent },
  { path: 'registration-success', component: RegistrationSuccessComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }