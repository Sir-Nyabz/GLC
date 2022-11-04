import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../shared/user.service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {

  submitted=false;
  forgotGroup:FormGroup;

  constructor(private userService:UserService,private router:Router,private formBuilder:FormBuilder) { 
    this.forgotGroup=this.formBuilder.group({
      email:['',[Validators.required,Validators.email]]
    })
  }

  get f(){
    return this.forgotGroup.controls
  }

  ngOnInit(): void {
  }

  onSubmit(){
    this.submitted=true;
    const email = this.forgotGroup.value.email;

    this.userService.sendMail(email).subscribe((res:any)=>{
      if(res){
        this.router.navigate(['/forgot']);
      //form.reset();
      }else{
        alert("Email does not exist");
        //form.reset();
      }
      
    },
    err=>{
      console.log(err);
    })

  }
}
