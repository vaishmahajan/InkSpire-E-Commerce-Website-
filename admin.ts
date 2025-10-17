// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-admin',
//   imports: [],
//   templateUrl: './admin.html',
//   styleUrl: './admin.css'
// })
// export class Admin {

// }----------------------------------------------------------




// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { ProductService } from '../product.service';
// import { Product } from '../product';

// @Component({
//   selector: 'app-admin',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './admin.html',
//   styleUrls: ['./admin.css']
// })


// export class Admin implements OnInit {
//   product: Product = { id: 0, name: '', description: '', price: 0, image: '', visible: true, quantity: 0 };
//   products: Product[] = [];
//   searchText: string = '';
//   editMode: boolean = false;
  

//   constructor(private productService: ProductService) {}

//   ngOnInit() {
//     this.productService.products$.subscribe(products => {
//       this.products = products;
//     });
//   }
  

//   addProduct() {
//     this.productService.addProduct(this.product);
//     this.resetForm();
//   }

//   editProduct(product: Product) {
//     this.product = { ...product };
//     this.editMode = true;
//   }

//   updateProduct() {
//     this.productService.updateProduct(this.product);
//     this.resetForm();
//   }

//   resetForm() {
//   this.product = { id: 0, name: '', description: '', price: 0, image: '', visible: true, quantity: 0 };
//   this.editMode = false;
// }


//   toggleVisibility(id: number) {
//     this.productService.toggleVisibility(id);
//   }

//   get filteredProducts() {
//     return this.products.filter(product =>
//       product.name.toLowerCase().includes(this.searchText.toLowerCase())
//     );

    
//   }
// }


import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../product.service';
import { Product } from '../product';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './admin.html',
  styleUrls: ['./admin.css']
})
export class Admin implements OnInit {
  product: Product = { id: 0, name: '', description: '', price: 0, image: '', visible: true, quantity: 0 };
  products: Product[] = [];
  searchText: string = '';
  editMode: boolean = false;
  message: string = '';

  selectedFile: File | null = null; 

  constructor(private productService: ProductService, private http: HttpClient) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getAllProducts().subscribe({
      next: (data) => this.products = data,
      error: (err) => console.error('Error loading products:', err)
    });
  }

  
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  
  onSubmit() {
    if (!this.selectedFile && !this.editMode) {
      alert('Please select an image file!');
      return;
    }

    const formData = new FormData();
    formData.append('name', this.product.name);
    formData.append('description', this.product.description);
    formData.append('price', this.product.price.toString());
    formData.append('quantity', this.product.quantity.toString());

    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    if (this.editMode) {
      this.productService.updateProduct(this.product.id, formData).subscribe({
        next: (res) => {
          alert(' Product updated successfully!');
          this.loadProducts();
          this.resetForm();
        },
        error: (err) => {
          console.error(err);
          alert(' Error updating product');
        }
      });
    } else {
      this.productService.addProduct(formData).subscribe({
        next: (res) => {
          alert(' Product added successfully!');
          this.loadProducts();
          this.resetForm();
        },
        error: (err) => {
          console.error(err);
          alert(' Error adding product');
        }
      });
    }
  }

  editProduct(product: Product) {
    this.product = { ...product };
    this.editMode = true;
  }

  toggleVisibility(id: number) {
    this.productService.toggleVisibility(id).subscribe({
      next: () => this.loadProducts(),
      error: (err) => console.error('Error toggling visibility:', err)
    });
  }

  resetForm() {
    this.product = { id: 0, name: '', description: '', price: 0, image: '', visible: true, quantity: 0 };
    this.selectedFile = null;
    this.editMode = false;
  }

  get filteredProducts() {
    return this.products.filter(product =>
      product.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
}
