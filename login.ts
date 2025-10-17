// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-login',
//   imports: [],
//   templateUrl: './login.html',
//   styleUrl: './login.css'
// })
// export class Login {
  
// }

// import { Component, Injectable } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { Router, RouterModule } from '@angular/router';
// import { User } from '../service/user';

// @Component({
//   selector: 'app-login',
//   standalone: true,
//   imports: [FormsModule, CommonModule, RouterModule],
//   templateUrl: './login.html',
//   styleUrls: ['./login.css']
// })
// // @Injectable({ providedIn: 'root' })
// export class Login {

//   email: string = '';
//   password: string = '';

//   constructor(private user: User, private route: Router) {}

//   login() {
//     const loginData = { email: this.email, password: this.password };
//     console.log(loginData);

//     this.user.loginUser(loginData).subscribe(
//       (resp) => {
//         console.log(resp);
//         alert('Login successful');
//         this.route.navigate(['/homepage']); // after login, go to dashboard
//       },
//       (err) => {
//         console.log(err);
//         alert('Invalid email or password');
//       }
//     );
//   }

//   loginWithGoogle() {
//     console.log('Google login clicked');
//     alert('Google login functionality not implemented yet.');
//   }
// }------------------------------------------------------------------

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { User } from '../service/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login implements OnInit {
  email: string = '';
  password: string = '';
  userType: string = '';
  isLoggedIn: boolean = false; // ✅ new

  constructor(private user: User, private route: Router) {}

  ngOnInit() {
    this.userType = localStorage.getItem('userType') || '';
    this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    console.log("Login for:", this.userType);
  }

  // ✅ LOGIN FUNCTION
  login() {
    const loginData = { email: this.email, password: this.password };
    console.log(loginData);

    this.user.loginUser(loginData).subscribe(
      (resp) => {
        console.log(resp);
        alert('Login successful');

        // Save login details in localStorage
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', this.email);
        localStorage.setItem('userType', this.userType);

        // Update local state
        this.isLoggedIn = true;

        // Redirect based on user type
        if (this.userType === 'admin') {
          this.route.navigate(['/admin']);
        } else {
          this.route.navigate(['/homepage']);
        }
      },
      (err) => {
        console.log(err);
        alert('Invalid email or password');
      }
    );
  }

  // ✅ LOGOUT FUNCTION
  logout() {
    // Clear user session
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userType');

    this.isLoggedIn = false;

    alert('Logout successful!');

    // Redirect to correct login page
    if (this.userType === 'admin') {
      this.route.navigate(['/adminlogin']);
    } else {
      this.route.navigate(['/customerlogin']);
    }
  }

  // Optional Google login
  loginWithGoogle() {
    console.log('Google login clicked');
    alert('Google login functionality not implemented yet.');
  }
}
