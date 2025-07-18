import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../shared/user.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  submitted = false;
  loginGroup: FormGroup;
  is_Loader: boolean = false;
  showPassword: boolean = false;

  constructor(private userService: UserService, private router: Router, private formBuilder: FormBuilder, private toaster: ToastrService) {

    this.loginGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  get l() {
    return this.loginGroup.controls
  }

   togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  ngOnInit(): void { }

  onSubmit() {
    this.is_Loader = true;
    this.submitted = true;
    const email = this.loginGroup.value.email;
    const password = this.loginGroup.value.password;

    this.userService.login(email, password).subscribe(
      (res: any) => {
        if (res.status === (200 || 201)) {
          localStorage.setItem('ADMIN-ASOREBA-GLC', res.token);
          // redirect to dashboard
          this.router.navigate(['/members']).then(() => {
            this.toaster.success('Logged in successfully');
          });
        } else {
          this.toaster.error(res.response);
        };
        this.is_Loader = false;
      },
      (err) => {
        this.toaster.error('Network Challenge');
        this.is_Loader = false;
      }
    );
  }
}
