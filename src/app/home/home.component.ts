import { Component } from '@angular/core';
import { ProductsService } from '../products.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../product.class';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  products: Product[] = [];
  categories: string[] = [];
  filteredProducts: Product[] = [];
  selectedCategory: string | null = null;

  constructor(private productsService: ProductsService, private route: ActivatedRoute) {}

  ngOnInit(): void {
  this.getProducts();
  this.getCategories();
  }

  getProducts(): void {
    this.productsService.getProducts().subscribe(
      (products: Product[]) => {
        this.products = products;
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
  filterByCategory(category: string) {
    // Implement the logic to filter products based on the selected category
    // For example, you can filter the products array based on the category
    this.filteredProducts = this.products.filter(product => product.category === category);
  }

}
