import { Component } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-registration-success',
  templateUrl: './registration-success.component.html',
  styleUrls: ['./registration-success.component.css']
})
export class RegistrationSuccessComponent {
  
  constructor(private userService: UserService) {}

  registerUser() {
    // Register the user
    const username = 'JohnDoe'; // Replace with the actual username
    this.userService.setRegisteredUser(username);
  }
}
