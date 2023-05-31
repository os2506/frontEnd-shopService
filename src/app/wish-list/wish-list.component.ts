import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { Product } from '../product.class';
import { WishlistService } from '../wishlist.service';
import { WishlistCountService } from '../whishlist-count.service';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css']
})
export class WishListComponent implements OnInit {
  wishlist: Product[] = [];
  wishlistCount: number = 0;
  selectedProduct: Product | undefined;

  constructor(private wishlistService: WishlistService, private wishlistCountService: WishlistCountService) { }

  ngOnInit() {

    this.wishlistCountService.wishlistCount$.subscribe(count => {
      this.wishlistCount = count;
    });

    this.getWishListData();
  }

  private getWishListData() {
    this.wishlistService.getProductsFromWishList().subscribe(
      (products: Product[]) => {
        this.wishlist = products;
        this.updateWishlistCount();
      },
      (error: any) => {
        console.error('Error retrieving wishlist data', error);
      }
    );
  }

  private updateWishlistCount() {
    this.wishlistCount = this.wishlist.length;
  }


  deleteSelectedItems() {
    console.log('Selected deleted product:', this.selectedProduct);
  }

  onRowSelect(event: any) {
    this.selectedProduct = event.data;
  }
}

