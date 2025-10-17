import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { User } from '../service/user';  // Make sure this service exists

@Component({
  selector: 'app-adminlogin',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './adminlogin.html',
  styleUrls: ['./adminlogin.css']   // ✅ fixed "styleUrl" → "styleUrls"
})
export class Adminlogin implements OnInit {
  email: string = '';
  password: string = '';
  userType: string = '';

  constructor(private user: User, private router: Router) {}

  ngOnInit(): void {
    this.userType = localStorage.getItem('userType') || 'admin';
    console.log('Login for:', this.userType);
  }

  login(): void {
    if (!this.email || !this.password) {
      alert('Please enter both email and password');
      return;
    }

    const loginData = { email: this.email, password: this.password };
    console.log('Login data:', loginData);

    this.user.loginUser(loginData).subscribe(
      (resp: any) => {
        console.log('Login success:', resp);
        alert('Login successful!');

        // ✅ redirect based on user type
        if (this.userType === 'admin') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/homepage']);
        }
      },
      (err: any) => {
        console.error('Login failed:', err);
        alert('Invalid email or password');
      }
    );
  }

  loginWithGoogle(): void {
    console.log('Google login clicked');
    alert('Google login functionality not implemented yet.');
  }
}
