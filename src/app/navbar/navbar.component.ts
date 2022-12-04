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
  first:any;
  LoggedInn:boolean=false;
  for_biodata:boolean=false;
  constructor(private userService:UserService,private router:Router,private http: HttpClient,private location:Location) { }

  ngOnInit(): void {
    if(window.location.href=='http://localhost:4200/members' || 
    window.location.href=='http://localhost:4200/member-biodata' || 
    window.location.href=='http://localhost:4200/contact' || 
    window.location.href=='http://localhost:4200/edit'){
      this.LoggedInn=true;
    }
  }


  Logout(){
    this.userService.logout()
    this.router.navigate(['/login']).
    then(() => {
      window.location.reload();
    });
  }



  goBack(){
    this.location.back();
  }

}
