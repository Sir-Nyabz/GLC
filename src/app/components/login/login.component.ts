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

  submitted=false;
  loginGroup:FormGroup;
  is_Loader:boolean=true;

  constructor(private userService: UserService, private router: Router,private formBuilder:FormBuilder,private toaster:ToastrService) {

    this.loginGroup=this.formBuilder.group({
      email:['',[Validators.required,Validators.email]],
      password:['',Validators.required]
    })
  }

  get l(){
    return this.loginGroup.controls
  }

  ngOnInit(): void {}

  onSubmit() {
    setTimeout(()=>
    {
      this.is_Loader=false
    },3000
    )

    this.submitted=true;
    const email = this.loginGroup.value.email;
    const password = this.loginGroup.value.password;

    this.userService.login(email,password).subscribe(
      (res: any) => {
        localStorage.setItem('ADMIN-ASOREBA-GLC', res.token);
       
        // redirect to dashboard
        this.router.navigate(['/members']).then(()=>{
          window.location.reload();
          this.toaster.success('Logged in successfully');
        })
        
      },
      (err) => {
        this.toaster.error('Network Challenge');
        window.location.reload();
      }
    );
  }
}
