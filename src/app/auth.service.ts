import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  private roles: string[] = [];
  private username: string = '';

  constructor() {
  }

  // Method to check if the user is logged in
  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  // Method to get the user's roles
  getRoles(): string[] {
    return this.roles;
  }

   // Method to set the user's roles
  setRoles(roles: string[]): void {
    this.roles = roles;
  }


  // Method to get the username
  getUsername(): string {
    return this.username;
  }

  // Method to log in the user
  // login(username: string, token: string): void {
  //   this.loggedIn.next(true);
  // }

  login(username: string, token: string): void {
    this.username = username;
    localStorage.setItem('username', username);
    this.loggedIn.next(true);
  }



  // Method to log out the user
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    //this.username = '';
    this.loggedIn.next(false);
  }
}