import { Component, Input } from '@angular/core';
import { Product } from '../product.class';

@Component({
  selector: 'app-product-edit',
  template: `
 <fieldset>
  <div *ngIf="product">
    <form>
      <div>
        <label for="name">Name:</label>
        <input type="text" id="name" [(ngModel)]="product.name" name="name" required>
      </div>
      <div>
        <label for="description">Description:</label>
        <textarea id="description" [(ngModel)]="product.description" name="description"></textarea>
      </div>
      <div>
        <label for="image">Image:</label>
        <img [src]="'https://primefaces.org/cdn/primeng/images/demo/product/' + product.image" alt="Product Image" width="100">
        <!-- <input type="text" id="newImage" [(ngModel)]="newImage" name="newImage"> -->
        <input type="file" (change)="onFileSelected($event)" accept="image/*">
      </div>
      <div>
        <label for="price">Price:</label>
        <input type="text" id="price" [(ngModel)]="product.price" name="price" required>
      </div>
      <div>
        <label for="quantity">Quantity:</label>
        <input type="text" id="quantity" [(ngModel)]="product.quantity" name="quantity" required>
      </div>
      <div>
        <label for="category">Category:</label>
        <input type="text" id="category" [(ngModel)]="product.category" name="category" required>
      </div>
    </form>
  </div>
</fieldset> `,
  styles: [
    `
      fieldset {
        border: 1px solid #ccc;
        padding: 10px;
        margin-top: 10px;
      }
      legend {
        font-weight: bold;
      }
      div {
        margin-bottom: 10px;
      }
      label {
        display: inline-block;
        width: 100px;
        font-weight: bold;
      }
      input,
      textarea {
        width: 700px;
      }
    `,
  ],
})
export class ProductEditComponent {


  @Input() product: Product | undefined;


  newImage?: string; // Declare the newImage property

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file && this.product) {
      // Perform any necessary file handling
      // After handling the file, update the product's image property with the new image URL or data URL
      // Example:
      this.product.image = 'path/to/new/image.jpg';
    }
  }
}