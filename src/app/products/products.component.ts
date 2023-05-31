import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../product.class';
import { ProductsService } from '../products.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { WishlistService } from '../wishlist.service';
import { WishlistCountService } from '../whishlist-count.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  categories: string[] = [];
  selectedCategory: string | null = null;
  filteredProducts: Product[] = [];
  token!: any;

  constructor(private productsService: ProductsService,
    private wishlistService: WishlistService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private wishlistCountService: WishlistCountService) { }


  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
    this.route.queryParams.subscribe((params) => {
      const category = params['category'];
      this.selectedCategory = category;
      this.filterProductsByCategory(category);
    });
  }

  getProducts(): void {
    this.productsService.getProducts().subscribe(
      (products: Product[]) => {
        this.products = products;
        this.filterProductsByCategory(this.selectedCategory);
      },
      (error: any) => {
        console.error('Error retrieving products:', error);
      }
    );
  }

  getCategories(): void {
    this.productsService.getCategories().subscribe(
      (categories: string[]) => {
        this.categories = categories;
      },
      (error: any) => {
        console.error('Error retrieving categories:', error);
      }
    );
  }

  filterByCategory(category: string | null) {
    this.selectedCategory = category;
    this.filterProductsByCategory(category);
  }

  clearFilter() {
    this.selectedCategory = null;
    this.filteredProducts = [...this.products];
  }

  private filterProductsByCategory(category: string | null) {
    if (!category || category === 'All') {
      this.filteredProducts = [...this.products];
    } else {
      this.filteredProducts = this.products.filter((product) => product.category === category);
    }
  }


  //Ajout de produt dans la wishList
  addProductToWishlist(product: Product) {
    const token = localStorage.getItem('token');
    if (token) {
      this.wishlistService.addWishlist(product, token).subscribe(
        response => {
          console.log("Response:", response);
          // Handle the case when the product is successfully added to the wishlist
          console.log("Added to wishlist");
          // Perform any additional actions you need here
          // For example, you can update the wishlist count using the shared service
          this.wishlistCountService.incrementWishlistCount();
        },
        error => {
          console.error(error);
        }
      );
    } else {
      console.log("Token not available");
    }
  }  
  
  

  //ajout de la wishList Data
  addToWishlist(product: Product) {
    this.addProductToWishlist(product);
  }

  //recuperation de la wishList Data
  private getWishListData() {
    this.wishlistService.getProductsFromWishList()
      .subscribe(
        (products: Product[]) => {
          this.products = products;
        },
        (error: any) => {
          console.error('Error retrieving wishlist data', error);
        }
      );}

}