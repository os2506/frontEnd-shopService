import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { ProductsComponent } from './products/products.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HeaderMenuComponent } from './header-menu/header-menu.component';
import {CdkMenuModule} from '@angular/cdk/menu';
import { ContentComponent } from './content/content.component';
import { LogInComponent } from './log-in/log-in.component';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { RecoverpasswordFormComponent } from './recoverpassword-form/recoverpassword-form.component';
import { ToastrModule } from 'ngx-toastr';
import { CategoryComponent } from './category/category.component';
import { FilterByPipe } from '../app/filter-by.pipe';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';


// PrimeNG modules
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { TableModule } from 'primeng/table';
import { RatingModule } from 'primeng/rating';
import { TagModule } from 'primeng/tag';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { DialogService } from 'primeng/dynamicdialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { SplitButtonModule } from 'primeng/splitbutton';





@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    ProductsComponent,
    FooterComponent,
    HeaderComponent,
    HeaderMenuComponent,
    ContentComponent,
    LogInComponent,
    RecoverPasswordComponent,
    RecoverpasswordFormComponent,
    CategoryComponent,
    FilterByPipe,
    DashboardComponent,
    ProductEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    HttpClientModule,
    MatGridListModule,
    CdkMenuModule,
    MatProgressSpinnerModule,
    ToastrModule.forRoot(),
    CardModule,
    ButtonModule,
    DialogModule,
    MenuModule,
    MenubarModule,
    TableModule,
    RatingModule,
    FormsModule,
    TagModule,
    DynamicDialogModule,
    SplitButtonModule
  ],
  providers: [
    DialogService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor() {
   
  }
}
