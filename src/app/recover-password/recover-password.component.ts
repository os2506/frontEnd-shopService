import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.css']
})
export class RecoverPasswordComponent implements OnInit {

  recoverForm!: FormGroup;
  isRecovering = false;

  constructor(private router: Router, private formBuilder: FormBuilder, private http: HttpClient) { }


  ngOnInit() {
    this.recoverForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  recover() {
    // Set the recovering state to true
    this.isRecovering = true;
    // Simulating an asynchronous operation with setTimeout
    setTimeout(() => {
      // After the recovery process is complete
      this.onSubmit();
      // Set the recovering state back to false
      this.isRecovering = false;
      this.router.navigate(['/home']); // Replace '/dashboard' with the desired component's route
    }, 2000); // Adjust the timeout duration as needed
  }

  onSubmit() {
    if (this.recoverForm.invalid) {
      return;
    }

    const formData = this.recoverForm.value;

    console.log(formData);
    // Send the form data to the backend
    this.http.post('http://localhost:8085/users/recover', this.recoverForm.value).subscribe(
      (response: any) => {
        // Handle the response from the backend
        console.log(response);
        if (response.message === "User exists!") {
          // user exist
          const email = this.recoverForm.value.email;
          this.router.navigate(['/pwdrecover'], { queryParams: { email } });

        } else {
          // user not found
          this.router.navigate(['home']);
        }

      },
      error => {
        // Handle any errors that occurred during the request
        console.error(error);
        if (error.error instanceof ErrorEvent) {
          // Client-side error occurred
          console.error('Client-side error:', error.error.message);
        } else {
          // Server-side error occurred
          console.error('Server-side error:', error.status, error.statusText);
          console.error('Error message:', error.error);
        }
      }
    );
  }

}
