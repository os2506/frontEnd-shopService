import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { WishlistCountService } from '../whishlist-count.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  wishlistCount: number = 0;


  cartlistCount: number = 0;
  username: string = '';
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService, private wishlistCountService: WishlistCountService) { }

  ngOnInit() {
    this.authService.isLoggedIn().subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
      const storedUser = JSON.parse(localStorage.getItem('user') || '');
      if (storedUser) {
        this.username = storedUser.username;
      }
    });

    this.wishlistCountService.wishlistCount$.subscribe(count => {
      this.wishlistCount = count;
    });

    // if (this.authService.checkTokenValidity()) {
    //   const storedUser = JSON.parse(localStorage.getItem('user') || '');
    //   console.log("Stored User");
    //   console.log(storedUser);
    //   if (storedUser) {
    //     this.username = storedUser.username;
    //   }
    // }
  }

  logOut() {
    this.authService.logout();
  }
}
