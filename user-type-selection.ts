// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-user-type-selection',
//   imports: [],
//   templateUrl: './user-type-selection.html',
//   styleUrl: './user-type-selection.css'
// })
// export class UserTypeSelection {

// }
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-type-selection',
  templateUrl: './user-type-selection.html',
  styleUrls: ['./user-type-selection.css']
})
export class UserTypeSelection {
  constructor(private router: Router) {}

  selectUserType(type: string) {
    // Store selected user type in localStorage
    localStorage.setItem('userType', type);

    // Redirect based on type
    if (type === 'admin') {
      this.router.navigate(['/adminlogin']);   // Admin login page
    } else {
      this.router.navigate(['/login']); // Customer login page
    }
  }
}

