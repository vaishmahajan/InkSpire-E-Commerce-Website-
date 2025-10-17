// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-adminregister',
//   imports: [],
//   templateUrl: './adminregister.html',
//   styleUrl: './adminregister.css'
// })
// export class Adminregister {

// }
import { Component, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common'; // <-- ADD THIS
import { FormsModule} from '@angular/forms';
import { User } from '../service/user';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,  
  imports: [FormsModule, CommonModule, RouterModule], // <-- ADD CommonModule
  templateUrl: './adminregister.html',
  styleUrls: ['./adminregister.css']
})

@Injectable({providedIn: 'root'})

export class Adminregister {

  constructor(private user: User, private route: Router){ }

  register(userData: any) {
    console.log(userData.value);
    this.user.addUser(userData.value).subscribe(
    (resp)=>{
      console.log(resp);
      alert("Data Added successfully");
      this.route.navigate(['/']);
    },
    (err)=>{
      console.log(err);
    }
    );

    
    
  }

  // ← Add this method here
  loginWithGoogle() {
    console.log("Google login clicked");
    alert("Google login clicked — functionality not implemented yet.");
    // Later: add Google OAuth logic here
  }


}
