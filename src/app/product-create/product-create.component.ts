import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  productForm!: FormGroup;
  imageFile: File | null = null;
  constructor(private formBuilder: FormBuilder,
    private http: HttpClient,
    public dialogRef: MatDialogRef<ProductCreateComponent>,
    private snackBar: MatSnackBar) {


  }

  ngOnInit() {
    this.productForm = this.formBuilder.group({
      code: [''],
      name: [''],
      description: [''],
      image: [''],
      price: [''],
      category: [''],
      quantity: [''],
      rating: [''],
      inventoryStatus: ['']
    });
  }


  onSubmit() {
    if (this.productForm.invalid) {
      return;
    }
    // Get the form data
    const formData = this.productForm.value;
  }

  onFileChange(event: any) {
    const files: FileList = event.target.files;
    if (files.length > 0) {
      this.imageFile = files[0];
      this.productForm.get('image')?.setValue(this.imageFile);
    }
  }


}
