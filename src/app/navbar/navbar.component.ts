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

}
