import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    registerForm!: FormGroup;
  
    constructor(private formBuilder: FormBuilder, private http: HttpClient) { }
  
    ngOnInit() {
      this.registerForm = this.formBuilder.group({
        username: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
        subscribe: [false],
        city: [''],
        state: [''],
        postalCode: ['']
      }, { validators: this.passwordMatchValidator });
    }
  
  
    get passwordsMatch(): boolean {
      const password = this.registerForm.get('password')?.value;
      const confirmPassword = this.registerForm.get('confirmPassword')?.value;
      return password === confirmPassword;
    }
  
  
    passwordMatchValidator(form: FormGroup) {
      const password = form.get('password')?.value;
      const confirmPassword = form.get('confirmPassword')?.value;
  
      if (password !== confirmPassword) {
        form.get('confirmPassword')?.setErrors({ misMatch: true });
      } else {
        form.get('confirmPassword')?.setErrors(null);
      }
    }
  
    onSubmit() {
      if (this.registerForm.invalid) {
        return;
      }
      // Get the form data
      const formData = this.registerForm.value;
  
      // Send the form data to the backend
      this.http.post('http://localhost:8085/users/register', formData).subscribe(
        response => {
          // Handle the response from the backend
          console.log(response);
        },
        error => {
          // Handle any errors that occurred during the request
          console.error(error);
        }
      );
    }
  }
