import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  LoggedInn:boolean=false;
  constructor(private userService:UserService,private router:Router,private http: HttpClient) { }

  ngOnInit(): void {
    if(this.userService.LoggedIn()&&window.location.href=='http://localhost:4200/members'){
      this.LoggedInn=true;
     
    }else{
      this.LoggedInn=false;
    }
  }

  Logout(){
   
    this.userService.logout()
    this.router.navigate(['/login']).
    then(() => {
      window.location.reload();
    });
    ;

  }


  add_new() {
    throw new Error('Method not implemented.');
    }
    
}
