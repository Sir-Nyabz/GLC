import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;

    this.userService.login(email, password).subscribe(
      (res: any) => {
        localStorage.setItem('ADMIN-ASOREBA-GLC', JSON.stringify(res.token));

        // redirect to dashboard
        this.router.navigate(['/members']).then(() => {
          window.location.reload();
        });
      },
      (err) => {
        alert('Network Challenge');
      }
    );
  }
}
