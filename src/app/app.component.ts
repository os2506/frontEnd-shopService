import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { WishlistService } from './wishlist.service';
import { Product } from './product.class';
import { ProductsService } from './products.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  selectedCategory!: string;
  wishlistCount: number = 0;
  wishlist: Product[] = []; // Assuming 'Product' is the type for wishlist items

  constructor(
    private authService: AuthService,
    private router: Router,
    private wishlistService: WishlistService,
    private productsService: ProductsService
  ) {}


  ngOnInit() {
    this.productsService.wishlistCount$.subscribe((count) => {
      this.wishlistCount = count;
    });

    //this.wishlist = this.productsService.getWishlist();

    //console.log(this.wishlistCount);
  }


  onCategorySelected(category: string) {
    this.selectedCategory = category;
  }

  isAdminRoute(): boolean {
    return this.router.url.startsWith('/admin');
    // Replace '/admin' with the actual admin route path in your application
  }

  isDashboardRoute(): boolean {
    return this.router.url === '/dashboard';
    // Replace '/dashboard' with the actual dashboard route path in your application
  }

  isWishlistRoute(): boolean {
    return this.router.url === '/wishlist';
  }
}