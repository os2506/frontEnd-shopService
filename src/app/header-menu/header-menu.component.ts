import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProductsService } from '../products.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.css']
})

export class HeaderMenuComponent implements OnInit {
  headerCategories: string[] = [];
  @Output() categorySelected: EventEmitter<string> = new EventEmitter<string>();
  @Output() adminMenuClicked: EventEmitter<void> = new EventEmitter<void>();

  constructor(private productService: ProductsService, private router: Router) { }


  onAdminMenuClicked() {
    this.adminMenuClicked.emit();
  }

  ngOnInit() {
    this.getHeaderCategories();
  }

  // Emit the selected category when it's clicked
  selectCategory(category: string) {
    this.categorySelected.emit(category);
  }

  getHeaderCategories() {
    this.productService.getCategories().subscribe(
      (categories: string[]) => {
        this.headerCategories = categories;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  filterByCategory(category: string) {
    this.categorySelected.emit(category);
    this.router.navigate(['/products'], { queryParams: { category: category } });
  }

}