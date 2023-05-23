import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../product.class';
import { ProductsService } from '../products.service';
import { ActivatedRoute } from '@angular/router';

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

  constructor(private productsService: ProductsService, private route: ActivatedRoute) {}


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
}