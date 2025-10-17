// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';  // ✅ needed for *ngIf, *ngFor
// import { RouterModule, Router } from '@angular/router';


// @Component({
//   selector: 'app-homepage',
//   imports: [CommonModule, RouterModule],  // ✅ Add CommonModule here
//   templateUrl: './homepage.html',
//   styleUrl: './homepage.css'
// })
// export class Homepage {

// }


import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';  // ✅ needed for *ngIf, *ngFor
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule, RouterModule],  // ✅ Add CommonModule here
  templateUrl: './homepage.html',
  styleUrls: ['./homepage.css']
})
export class Homepage implements OnInit {
  isLoggedIn: boolean = false;
  userType: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    this.userType = localStorage.getItem('userType') || '';
  }

  // ✅ LOGOUT FUNCTION
  logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userType');

    this.isLoggedIn = false;
    alert('Logout successful!');

    if (this.userType === 'admin') {
      this.router.navigate(['/adminlogin']);
    } else {
      this.router.navigate(['/customerlogin']);
    }
  }
}
