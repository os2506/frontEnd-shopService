import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { WishlistCountService } from '../whishlist-count.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  wishlistCount: number = 0;
  isAdmin: boolean = false;
  cartlistCount: number = 0;
  username: string = '';
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService,
    private wishlistCountService: WishlistCountService,
    private userService: UserService) { }


  ngOnInit() {
    this.authService.isLoggedIn().subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
      console.log(isLoggedIn); //true
      const storedUserData = localStorage.getItem('user');
      console.log('Const Stored User Data:', storedUserData);

      try {

        if (storedUserData) {
          this.username = storedUserData;
          this.isLoggedIn = true;
          console.log('Username:', this.username);
        }else{
          console.log('Usernam Not FOUND on the storage');
        }

      } catch (error) {
        console.error('Error parsing user data from local storage:', error);
      }
    });

    if (this.isLoggedIn) {
      this.username = localStorage.getItem('user') || '';
    }

    this.wishlistCountService.wishlistCount$.subscribe(count => {
      this.wishlistCount = count;
    });
  }


  // if (this.authService.checkTokenValidity()) {
  //   const storedUser = JSON.parse(localStorage.getItem('user') || '');
  //   console.log("Stored User");
  //   console.log(storedUser);
  //   if (storedUser) {
  //     this.username = storedUser.username;
  //   }
  // }

  logOut() {
    this.authService.logout();
    this.isLoggedIn = false;
  }

  isAdminUser(): boolean {
    const roles = this.authService.getRoles();
    return roles.includes('ADMIN');
  }
}
