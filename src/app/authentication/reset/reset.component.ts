import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { UserService } from '../../shared/user.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {

  constructor(private route:ActivatedRoute,private userService:UserService,private router:Router) { }

  ngOnInit(): void {
    const snapshot=this.route.snapshot.params['token']
    localStorage.setItem('token', snapshot)
  }

  reset(form:NgForm){
    const new_password = form.value.new_password;
    const confirm_new_password = form.value.confirm_new_password;

    if(confirm_new_password==new_password){
    this.userService.resetPassword(new_password).subscribe((res:any)=>{
      if(res.status==200){
      alert('Password reset successsful')
      this.router.navigate(['/login']);
      localStorage.removeItem('token');
    }
    else{
      alert('Password change was unsuccessful')
      this.router.navigate(['/forgot']);
      localStorage.removeItem('token');
    }
    },
    err=>{
      alert('Network challenge')
      localStorage.removeItem('token');
    })

  }else{
    alert('Passwords mismatch')
    form.reset()
  }
}

}
