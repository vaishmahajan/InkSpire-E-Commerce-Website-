// import { Injectable } from '@angular/core';
// import { BehaviorSubject } from 'rxjs';
// import { Product } from './product';

// @Injectable({
//   providedIn: 'root'
// })
// export class ProductService {
//   private products: Product[] = [];
//   private productsSubject = new BehaviorSubject<Product[]>(this.products);
//   products$ = this.productsSubject.asObservable();

//   addProduct(product: Product) {
//     product.id = this.products.length + 1;
//     product.visible = true;
//     this.products.push(product);
//     this.productsSubject.next(this.products);
//   }

//   updateProduct(updatedProduct: Product) {
//     const index = this.products.findIndex(p => p.id === updatedProduct.id);
//     if (index !== -1) {
//       this.products[index] = updatedProduct;
//       this.productsSubject.next(this.products);
//     }
//   }

//   toggleVisibility(id: number) {
//     const product = this.products.find(p => p.id === id);
//     if (product) {
//       product.visible = !product.visible;
//       this.productsSubject.next(this.products);
//     }
//   }
// }--------------------------------------------------------------------------------------------------


// import { Injectable } from '@angular/core';
// import { BehaviorSubject } from 'rxjs';
// import { Product } from './product';

// @Injectable({
//   providedIn: 'root'
// })
// export class ProductService {
//   private products: Product[] = [];
//   private productsSubject = new BehaviorSubject<Product[]>(this.products);
//   products$ = this.productsSubject.asObservable();

//   addProduct(product: Product) {
//     product.id = this.products.length + 1;
//     product.visible = true;
//     this.products.push({ ...product }); // ensure a new copy
//     this.productsSubject.next([...this.products]); // <-- important!
//   }

//   updateProduct(updatedProduct: Product) {
//     const index = this.products.findIndex(p => p.id === updatedProduct.id);
//     if (index !== -1) {
//       this.products[index] = { ...updatedProduct };
//       this.productsSubject.next([...this.products]);
//     }
//   }
//   toggleVisibility(id: number) {
//     const product = this.products.find(p => p.id === id);
//     if (product) {
//       product.visible = !product.visible;
//       this.productsSubject.next([...this.products]);
//     }
//   }
// }


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from './product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'http://localhost:8080/product'; // Spring Boot backend URL

  constructor(private http: HttpClient) {}

  // GET all products
  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/list`);
  }

  // ADD / UPDATE product using FormData
addProduct(formData: FormData): Observable<any> {
  return this.http.post(`${this.baseUrl}/add`, formData);
}

updateProduct(id: number, formData: FormData): Observable<any> {
  return this.http.put(`${this.baseUrl}/updateproduct/${id}`, formData);
}

  // TOGGLE visibility
  toggleVisibility(id: number): Observable<Product> {
    return this.http.patch<Product>(`${this.baseUrl}/toggle/${id}`, null);
  }

  // DELETE product (optional)
  deleteProduct(id: number): Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}/delete/${id}`);
  }
}
