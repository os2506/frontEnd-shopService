import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsernameService {
  private usernameSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

  setUsername(username: string) {
    this.usernameSubject.next(username);
  }

  getUsername(): Observable<string> {
    return this.usernameSubject.asObservable();
  }
}
