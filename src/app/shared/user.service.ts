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

  headers = new HttpHeaders();

  constructor(
    private http: HttpClient,
    private router: Router,
    private bnIdle: BnNgIdleService
  ) {}

  // Login
  login(email:string,password:string) {
    return this.http.post(this.loginUrl, {
     email:email,
     password:password
    });
  }

  //Send Mail
  sendMail(email: string) {
    return this.http.post(this.sendMailUrl, {
      email: email
    });
  }

  //if the user is logged in
  LoggedIn() {
    return !!localStorage.getItem('ADMIN-ASOREBA-GLC');
  }

  //get the token from the local storage
  getToken() {
    return localStorage.getItem('ADMIN-ASOREBA-GLC');
  }

  //logout the user
  logout() {
    localStorage.removeItem('ADMIN-ASOREBA-GLC');
  }

  autoLogout() {
    this.bnIdle.startWatching(1800).subscribe((isTimedOut: boolean) => {
      if (isTimedOut) {
        alert('Session expired');
        this.logout();
        this.router.navigate(['/login']).then(() => {
          window.location.reload();
        });
        this.bnIdle.stopTimer();
      }
    });
  }

  //change the password
  resetPassword(password: string) {
    return this.http.put(
      this.sendMailUrl,
      {
        password: password
      },
      { headers: this.headers }
    );
  }
}
