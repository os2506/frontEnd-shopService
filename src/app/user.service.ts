import { Injectable } from '@angular/core';
import { Utilisateur } from './utilisateur';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8085'; // Replace with your Java backend API URL

  constructor(private http: HttpClient) {}

  //recuperation des utilisateurs

  getUsers(): Observable<any> {
    const url = `${this.apiUrl}/users/`;
    return this.http.get(url);
  }

}
