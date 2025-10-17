import { Injectable } from '@angular/core';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: Product[] = []; // ✅ now it's Product[]

  addToCart(product: Product) {
    const existing = this.cart.find(item => item.id === product.id);
    if (existing) {
      existing.quantity += 1; // increment quantity
    } else {
      this.cart.push({ ...product, quantity: 1 }); // add product with quantity
    }
  }

  removeFromCart(productId: number) {
    this.cart = this.cart.filter(item => item.id !== productId);
  }

  getCartItems(): Product[] {
    return this.cart;
  }

  clearCart() {
    this.cart = [];
  }

  getTotalAmount(): number {
    return this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }
}
