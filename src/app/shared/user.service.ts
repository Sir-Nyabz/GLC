import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BnNgIdleService } from 'bn-ng-idle';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  loginUrl = 'https://nyabz.pythonanywhere.com/admin-api/authentication/';
  sendMailUrl = 'https://nyabz.pythonanywhere.com/admin-api/reset-password/';

  headers= new HttpHeaders()
 
  constructor(private http: HttpClient, private router: Router, private bnIdle:BnNgIdleService) {}

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
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  autoLogout(){ 
    this.bnIdle.startWatching(10).subscribe((isTimedOut:boolean)=>{
      if(isTimedOut){
        alert('Session expired');
        this.logout();
        this.bnIdle.stopTimer();
      }
    })
  }

  verifyLogged():boolean{
    const token=localStorage.getItem('token');
    return token ? true:false;
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
