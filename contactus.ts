// import { Component } from '@angular/core';
// import { FormsModule } from '@angular/forms'; // Required for ngModel

// @Component({
//   selector: 'app-contactus',
//   imports: [FormsModule],
//   templateUrl: './contactus.html',
//   styleUrl: './contactus.css'
   
// })
// export class Contactus {

// }
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contactus',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contactus.html',
  styleUrls: ['./contactus.css']
})
export class Contactus {
  contact = {
    name: '',
    email: '',
    contactNo: '',
    message: ''
  };

  submitContact() {
    console.log('Contact form submitted:', this.contact);
    alert(`Thank you ${this.contact.name}, your message has been sent!`);
    this.contact = { name: '', email: '', contactNo: '', message: '' }; // Reset form
  }
}
