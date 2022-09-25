import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  LoggedInn:boolean=false;
  for_biodata:boolean|any;
  constructor(private userService:UserService,private router:Router,private http: HttpClient,private location:Location) { }

  ngOnInit(): void {
    if(this.userService.LoggedIn()&&window.location.href=='http://localhost:4200/members'){
      this.LoggedInn=true;
    }else if(this.userService.LoggedIn()&&window.location.href=='http://localhost:4200/member_biodata'){
      this.for_biodata=true
    }else if(this.userService.LoggedIn()&&window.location.href=='http://localhost:4200/biodata'){
      this.for_biodata=true
    }else if(this.userService.LoggedIn()&&window.location.href=='http://localhost:4200/contact'){
      this.for_biodata=true
    }
    else{
      this.LoggedInn=false;
      this.for_biodata=false
    }
  }

  Logout(){
    this.userService.logout()
    this.router.navigate(['/login']).
    then(() => {
      window.location.reload();
    });
  }

  navig_member_biodata(){
    this.router.navigate(['/member_biodata']).
    then(() => {
      window.location.reload();
    });
  }

  goBack(){
    this.location.back();
  }


  add_new() {
    throw new Error('Method not implemented.');
    }
    
}
