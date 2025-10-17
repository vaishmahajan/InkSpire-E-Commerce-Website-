import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'; // ✅ Import Observable

@Injectable({
  providedIn: 'root'
})
export class User {
  
  
  baseUrl:any="http://localhost:8080/user/api";
  constructor(private http:HttpClient) { }

  public addUser(userData: any) {
    return this.http.post(this.baseUrl+"/register", userData);
  }
  public getUsers()
  {
    console.log(this.baseUrl + "/list")
    return this.http.get(this.baseUrl + "/list");
  }

  public delete(uid:any) {
    return this.http.delete(this.baseUrl+"/delete/"+uid);
  }

  
  public update(uid:any, userData:any) {
    return this.http.put(this.baseUrl+"/update/"+uid, userData);
  }

  public getUserById(uid:any) {
    return this.http.get(this.baseUrl+"/get/"+uid);
  }

  
  // ✅ Add this method for login
  public loginUser(loginData: any): Observable<any> {
    return this.http.post(this.baseUrl + "/login", loginData);
  }

}
