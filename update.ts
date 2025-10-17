import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../service/user';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update',
  standalone: true,    
  imports: [FormsModule, CommonModule],
  templateUrl: './update.html',
  styleUrls: ['./update.css']
})
export class Update {
  
  constructor(private userService: User, private route: Router, private router: ActivatedRoute) {}
  
  uid:any;
  userRepo:any;

  ngOnInit() {
    this.userService.getUserById(this.router.snapshot.params[`uid`]).subscribe(
      resp=>{
        console.log(resp);
        this.userRepo=resp;
        this.uid=this.router.snapshot.params[`uid`];
      },
      (err)=>{
        console.log(err);
        alert("Something went wrong...!");
      }
    );
  }

  public update(updateData: any) {
    console.log(updateData);
    this.userService.update(this.uid, updateData.value).subscribe(
      (resp) => {
        console.log(updateData.value);
        alert("User updated successfully");
        this.route.navigate(['/']);
      },
      (err) => {
        console.log(err);
        location.reload();
        alert("Something went wrong...!");
      });
  }

}