import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsernameService } from '../username.service';
import { AuthService } from '../auth.service';
import { LoginResponse } from '../login-response';


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  loginForm!: FormGroup;
  displayAdminButton = false;


  constructor(private usernameService: UsernameService,
    private router: Router,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private authService: AuthService) {

  }


  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      remember: []
    });
  }


  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    // Get the form data
    const formData = this.loginForm.value;

    // Send the form data to the backend
    this.http.post<LoginResponse>('http://localhost:8085/users/login', formData).subscribe(
      response => {
        // Handle the response from the backend
        const username = response.username;
        const roles = response.roles;
        const token = response.token;

        // Store the token in localStorage or wherever you need to use it
        localStorage.setItem('token', token);

        this.usernameService.setUsername(username); // Set the username using the service
        this.authService.setRoles(roles); // Set the roles using the AuthService
        this.authService.login(username, token);

        if (roles.includes('ADMIN')) {
          //this.displayAdminButton = true;
          this.router.navigate(['/products']);
        } else {
          //this.displayAdminButton = false;
          this.router.navigate(['/products']);
        }
      },
      error => {
        // Handle any errors that occurred during the request
        console.error(error);
        this.router.navigate(['/unauthorized']);
      }
    );
  }

  goToRecoverComponent() {
    this.router.navigate(['/recover']);
  }
}
