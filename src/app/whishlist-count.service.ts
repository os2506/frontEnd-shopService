import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistCountService {
  private wishlistCountSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  wishlistCount$ = this.wishlistCountSubject.asObservable();

  updateWishlistCount(count: number) {
    this.wishlistCountSubject.next(count);
    console.log(count);
  }

  incrementWishlistCount() {
    const currentCount = this.wishlistCountSubject.getValue();
    this.wishlistCountSubject.next(currentCount + 1);
  }
  
}
