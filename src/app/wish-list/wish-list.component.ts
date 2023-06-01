import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
  checked!: boolean;

  constructor(private wishlistService: WishlistService, 
    private wishlistCountService: WishlistCountService,
    private changeDetectorRef: ChangeDetectorRef) { }

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


  removeProductFromWishlist(product: Product) {
    const token = localStorage.getItem('token');
    if (token) {
      this.wishlistService.deleteWishlist(product, token).subscribe(
        response => {
          console.log("Response:", response);
          this.wishlist = this.wishlist.filter(item => item.id !== product.id);
           this.refreshWishlist();
           location.reload(); 
        },
        error => {
          console.error(error);
        }
      );
    } else {
      console.log("Token not available");
    }
  }

  removeAllProductFromWishlist(){
    const token = localStorage.getItem('token');
    if (token) {
      this.wishlistService.deleteAllFromWishlist(token).subscribe(
        response => {
          console.log("Response:", response);
          location.reload();
        },
        error => {
          console.error(error);
        }
      );
    } else {
      console.log("Token not available");
    }
  }


    // remove product by Id from wishList
    removeFromWishlist(product: Product) {
      this.removeProductFromWishlist(product);
    }


    // remove all products from wishList
    removeAllFromWishlist() {
      this.removeAllProductFromWishlist();
    }

    // refresh wishList
    refreshWishlist() {
      this.getWishListData();
      this.changeDetectorRef.detectChanges();
    }
    

}

