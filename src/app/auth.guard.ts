import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    // Check if the user is logged in
    if (this.authService.isLoggedIn()) {
      // Check the user's role
      const roles = this.authService.getRoles();

      console.log(roles);

      // Allow access based on the user's role
      if (roles.includes('ADMIN')) {
        return true; // Allow access for ADMIN role
      } else {
        // Redirect to unauthorized page for other roles
        this.router.navigate(['/unauthorized']);
        return false; // Deny access for other roles
      }
    } else {
      // Redirect to login page for unauthenticated users
      this.router.navigate(['/log-in']);
      return false; // Deny access for unauthenticated users
    }
  }
}