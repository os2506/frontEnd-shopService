import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { ProductsComponent } from './products/products.component';
import { LogInComponent } from './log-in/log-in.component';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';
import { RecoverpasswordFormComponent } from './recoverpassword-form/recoverpassword-form.component';
import { FooterComponent } from './footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'log-in', component: LogInComponent },
  { path: 'recover', component: RecoverPasswordComponent },
  { path: 'pwdrecover', component: RecoverpasswordFormComponent },
  { path: 'footer', component: FooterComponent },
  { path: 'admin', component: DashboardComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
