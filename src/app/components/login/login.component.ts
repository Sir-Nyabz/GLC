import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../shared/user.service';
import { FormControl, FormGroup, Validators, FormBuilder, AbstractControl, NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  submitted=false;
  loginGroup:FormGroup;

  constructor(private userService: UserService, private router: Router,private formBuilder:FormBuilder) {

    this.loginGroup=this.formBuilder.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required]]
    })
  }

  get l(){
    return this.loginGroup.controls
  }

  ngOnInit(): void {}

  onSubmit(form:any) {
    const email = form.value.email;
    const password = form.value.password;

    this.userService.login(email,password).subscribe(
      (res: any) => {
        localStorage.setItem('ADMIN-ASOREBA-GLC', res.token);

        // redirect to dashboard
        this.router.navigate(['/members']).then(()=>{
          window.location.reload()
        })
      },
      (err) => {
        alert('Network Challenge');
      }
    );
  }
}
