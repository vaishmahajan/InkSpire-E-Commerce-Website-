// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-cart',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './cart.html',
//   styleUrls: ['./cart.css']
// })
// export class Cart {
//   cartItems = [
//     { name: 'Notebook', price: 250, quantity: 2, image: '/carft3.jpeg' },
//     { name: 'Ball Pen', price: 50, quantity: 3, image: '/compas.jpeg' },
//     { name: 'Diary', price: 300, quantity: 1, image: '/book5.jpeg' }
//   ];

//   // Calculate total price
//   get total() {
//     return this.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
//   }

//   // Increase quantity
//   increaseQuantity(item: any) {
//     item.quantity++;
//   }

//   // Decrease quantity
//   decreaseQuantity(item: any) {
//     if (item.quantity > 1) {
//       item.quantity--;
//     }
//   }

//   // Remove item
//   removeItem(index: number) {
//     this.cartItems.splice(index, 1);
//   }
// }------------------------------------


import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Product } from '../product';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // ✅ Import this

@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './cart.html',
  styleUrls: ['./cart.css']
})
export class Cart implements OnInit {
  cartItems: Product[] = [];
  total: number = 0;

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
    this.calculateTotal();
  }

  increaseQuantity(item: Product) {
    item.quantity += 1;
    this.calculateTotal();
  }

  decreaseQuantity(item: Product) {
    if (item.quantity > 1) {
      item.quantity -= 1;
      this.calculateTotal();
    }
  }

  removeItem(index: number) {
    this.cartItems.splice(index, 1);
    this.cartService.clearCart(); // optional: update CartService
    this.cartItems.forEach(item => this.cartService.addToCart(item));
    this.calculateTotal();
  }

  calculateTotal() {
    this.total = this.cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }

  proceedToCheckout() {
    // Optional: Navigate to Payment page
    this.router.navigate(['/payment'], { state: { totalAmount: this.total } });
  }
}

