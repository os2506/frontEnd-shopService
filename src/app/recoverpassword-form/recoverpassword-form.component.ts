import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-recoverpassword-form',
  templateUrl: './recoverpassword-form.component.html',
  styleUrls: ['./recoverpassword-form.component.css']
})
export class RecoverpasswordFormComponent implements OnInit {
  
  email!: string;
  pwdrecoverForm!: FormGroup;

  constructor(private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder, private http: HttpClient, private toastr: ToastrService) { }

    ngOnInit() {
      this.route.queryParams.subscribe(params => {
        this.email = params['email'];
        // Now you have access to the email value
        console.log(this.email);
        // Use the email value as needed
      });
  
      this.pwdrecoverForm = this.formBuilder.group({
        newPassword: ['', Validators.required],
        confirmNewPassword: ['', Validators.required]
      }, { validators: this.passwordMatchValidator });
    }


  get passwordsMatch(): boolean {
    const newPassword = this.pwdrecoverForm.get('newPassword')?.value;
    const confirmNewPassword = this.pwdrecoverForm.get('confirmNewPassword')?.value;
    return newPassword === confirmNewPassword;
  }

  passwordMatchValidator(form: FormGroup) {
    const newPassword = form.get('newPassword')?.value;
    const confirmNewPassword = form.get('confirmNewPassword')?.value;
  
    if (newPassword !== confirmNewPassword) {
      form.get('confirmPassword')?.setErrors({ misMatch: true });
    } else {
      form.get('confirmPassword')?.setErrors(null);
    }
  }

    onSubmit() {
      if (this.pwdrecoverForm.valid) {
        const formData = {
          email: this.email,
          newPassword: this.pwdrecoverForm.value.newPassword
        };
        
        this.http.put('http://localhost:8085/users/update-password', formData).subscribe(
        (response: any) => {
                console.log(response);
                if(response.message === "Password updated successfully"){

                // Show success message using toastr
                  this.toastr.success(response.message, 'Success');

                  this.router.navigate(['/log-in']);

                } else {

                  this.toastr.error(response.message, 'error');

                  this.router.navigate(['/log-in']);
                }
            // Handle the response from the server
          },
          (error) => {
            // Handle any errors that occurred during the request
          }
        );
      }
    }
}
