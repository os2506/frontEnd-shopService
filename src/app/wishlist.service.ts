import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from './product.class';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  private wishlistUrl = 'http://localhost:8085/wishlists/add';
  private wishlists$: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  private wishlistItems: any[] = []; // Store wishlist items
  private wishlistCountSubject: Subject<number> = new Subject<number>();
  wishlistCount$ = this.wishlistCountSubject.asObservable();


  constructor(private http: HttpClient) { }


  addWishlist(product: Product, token: string): Observable<Response> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
    return this.http.post<Response>(this.wishlistUrl, product, { headers });
  }

  getProductsFromWishList(): BehaviorSubject<Product[]> {
    if (this.wishlistItems.length === 0) {
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      });

      this.http.get<Product[]>('http://localhost:8085/wishlists/', { headers }).subscribe(
        data => {
          this.wishlistItems = data;
          this.wishlists$.next(this.wishlistItems);
        },
        error => {
          console.log('Error fetching products', error);
        }
      );
    }

    return this.wishlists$;
  }

  // Get the count of wishlist items as an Observable
  getWishlistCount(): Observable<number> {
    return this.wishlistCountSubject.asObservable();
  }

  // Update the wishlist count
  private updateWishlistCount() {
    this.wishlistCountSubject.next(this.wishlistItems.length);
    console.log(this.wishlistItems.length);
  }
}