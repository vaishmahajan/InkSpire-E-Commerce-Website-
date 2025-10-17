// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Payment } from './payment';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class PaymentService {
//   private baseUrl = 'http://localhost:8080/payment';

//   constructor(private http: HttpClient) {}

//   makePayment(payment: Payment): Observable<Payment> {
//     return this.http.post<Payment>(`${this.baseUrl}/add`, payment);
//   }

//   getAllPayments(): Observable<Payment[]> {
//     return this.http.get<Payment[]>(`${this.baseUrl}/list`);
//   }
// }
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  totalAmount = 0; // Set this in your cart page before navigating
}
