import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginResponse } from '../login-response';
import { UsernameService } from '../username.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(private usernameService: UsernameService, private router: Router, private formBuilder: FormBuilder, private http: HttpClient) { }
    
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

  console.log(formData);

  // Send the form data to the backend
  this.http.post<LoginResponse>('http://localhost:8085/users/login', formData).subscribe(
    response => {
      // Handle the response from the backend
      const username = response.username;

      this.usernameService.setUsername(username); // Set the username using the service

      this.router.navigate(['/home', { username: username }]);
    },
    error => {
      // Handle any errors that occurred during the request
      console.error(error);
    }
  );
}

goToRecoverComponent() {
  this.router.navigate(['/recover']);
  }
}
