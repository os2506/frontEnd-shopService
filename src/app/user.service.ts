import { Injectable } from '@angular/core';
import { Utilisateur } from './utilisateur';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private registeredUser = new Subject<string>();
  private apiUrl = 'http://localhost:8085';

  constructor(private http: HttpClient, private authService: AuthService) {}

  //recuperation des utilisateurs
  getUsers(): Observable<any> {
    const url = `${this.apiUrl}/users/`;
    return this.http.get(url);
  }

  setRegisteredUser(username: string): void {
    this.registeredUser.next(username);
  }

  getRegisteredUser(): Observable<string> {
    return this.registeredUser.asObservable();
  }

 
  getLoggedInUser(): string {
    return this.authService.getUsername();
  }

  delete(id: number): Observable<any> {
    console.log("delete user service");
    const url = `${this.apiUrl}/users/${id}`;
    return this.http.delete(url);
  }
  
}
