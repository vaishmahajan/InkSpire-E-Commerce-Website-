// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-products',
//   imports: [],
//   templateUrl: './products.html',
//   styleUrl: './products.css'
// })
// export class Products {

// }
// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-products',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './products.html',
//   styleUrls: ['./products.css']
// })
// export class Products {
//   searchText: string = '';

//   products = [
//   { name: 'Notebook', description: 'High quality notebook', price: 250, image: '/notebook classmate.jpg' },
//   { name: 'Files', description: 'Secure and durable', price: 250, image: '/book6.jpeg' },
//   { name: 'Craft Paper', description: 'Perfect for arts', price: 100, image: '/craft.jpeg' },
//   { name: 'Scale Box', description: 'Durable scale box', price: 160, image: '/scale natraj.jpg' },
//   { name: 'Marker', description: 'Long lasting marker', price: 100, image: '/pen.jpeg' },
//   { name: 'Diary', description: 'Leather-bound diary', price: 300, image: '/set.jpeg' },
//   { name: 'Water Color', description: 'Bright & vibrant colors', price: 500, image: '/watercolor.jpeg' },
//   { name: 'Ball Pen', description: 'Smooth writing pen', price: 50, image: '/ballpen.jpeg' },
//   { name: 'Pencil Box', description: 'Trendy & durable pencil box', price: 200, image: '/pencilbox.jpeg' },
//   { name: 'Eraser', description: 'Soft & clean erasing', price: 20, image: '/eraser.jpeg' },
//   { name: 'Sharpener', description: 'Durable blade', price: 30, image: '/sharpener.jpeg' },
//   { name: 'Sketch Pens', description: '12 vibrant colors', price: 120, image: '/sketchpens.jpeg' },
//   { name: 'Eraser', description: 'Soft & clean erasing', price: 20, image: '/eraser.jpeg' },
//   { name: 'Sharpener', description: 'Durable blade', price: 30, image: '/sharpener.jpeg' },
//   { name: 'Sketch Pens', description: '12 vibrant colors', price: 120, image: '/sketchpens.jpeg' }
// ];

//   get filteredProducts() {
//     return this.products.filter(product =>
//       product.name.toLowerCase().includes(this.searchText.toLowerCase())
//     );
//   }
// }-----------------------------------------------------------------------------


// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { ProductService } from '../product.service';
// import { Product } from '../product';
// import { CartService } from '../cart.service';
// import { Router } from '@angular/router';


// @Component({
//   selector: 'app-products',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './products.html',
//   styleUrls: ['./products.css']
// })
// export class Products implements OnInit {
//   searchText: string = '';
//   products: Product[] = [];

//   constructor(private productService: ProductService) {}

//   ngOnInit() {
//     this.loadProducts(); // ✅ fetch products from backend when page loads
//   }

//   // ✅ Load products from backend API
//   loadProducts() {
//     this.productService.getAllProducts().subscribe({
//       next: (data: Product[]) => {
//         this.products = data;
//       },
//       error: (err) => console.error('❌ Error loading products:', err)
//     });
//   }

//   // ✅ Filter visible products and apply search
//   get filteredProducts() {
//     return this.products
//       .filter(product => product.visible)
//       .filter(product =>
//         product.name.toLowerCase().includes(this.searchText.toLowerCase())
//       );
//   }
// }


//-----------------------------

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../product';
import { CartService } from '../cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products.html',
  styleUrls: ['./products.css']
})
export class Products implements OnInit {
  searchText: string = '';
  products: Product[] = [
    
  ];

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {}

  get filteredProducts() {
    return this.products
      .filter(product => product.visible)
      .filter(product =>
        product.name.toLowerCase().includes(this.searchText.toLowerCase())
      );
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    this.router.navigate(['/cart']);
  }
}
