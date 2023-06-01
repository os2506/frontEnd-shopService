import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

interface CartItem {
  name: string;
  price: number;
  quantity: number;
  image: string;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  firstFormGroup = this._formBuilder.group({
    //firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
   // secondCtrl: ['', Validators.required],
  });
  isLinear = false;
  cartItems: CartItem[] = [];

  constructor(private _formBuilder: FormBuilder) {}

  removeFromCart(item: CartItem): void {
    const index = this.cartItems.indexOf(item);
    if (index !== -1) {
      this.cartItems.splice(index, 1);
    }
  }

  getTotalItems(): number {
    let totalItems = 0;
    for (const item of this.cartItems) {
      totalItems += item.quantity;
    }
    return totalItems;
  }

  getTotalPrice(): number {
    let totalPrice = 0;
    for (const item of this.cartItems) {
      totalPrice += item.price * item.quantity;
    }
    return totalPrice;
  }

}

