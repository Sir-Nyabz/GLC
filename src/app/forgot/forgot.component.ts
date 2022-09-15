import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {

  constructor(private userService:UserService,private router:Router) { }

  ngOnInit(): void {
  }

  onSubmit(form:NgForm){
    const email = form.value.email;
    const password = form.value.password;

    this.userService.sendMail(email).subscribe((res:any)=>{
      if(res){
        this.router.navigate(['/forgot']);
      form.reset();
      }else{
        alert("Email does not exist");
        form.reset();
      }
      
    },
    err=>{
      console.log(err);
    })

  }
}
