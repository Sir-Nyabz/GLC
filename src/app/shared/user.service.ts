import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  loginUrl = 'https://nyabz.pythonanywhere.com/admin-api/authentication/';
  sendMailUrl = 'https://nyabz.pythonanywhere.com/admin-api/reset-password/';

  headers= new HttpHeaders()
 
  constructor(private http: HttpClient, private router: Router) {}

  // Login
  login(email: string, password: string) {
    return this.http.post(this.loginUrl, {
      email: email,
      password: password,
    });
  }

  //Send Mail
  sendMail(email: string) {
    return this.http.post(this.sendMailUrl, {
      email: email,
    });
  }

  //if the user is logged in
  LoggedIn() {
    return !!localStorage.getItem('token');
  }

  //get the token from the local storage
  getToken() {
    return localStorage.getItem('token');
  }

  //logout the user
  logout() {
    return localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  //change the password
  resetPassword(password: string) {
    return this.http.put(this.sendMailUrl, {
      password: password,
    },
    { 'headers': this.headers }
    );
  }
}
