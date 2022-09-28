import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';

@Component({
  selector: 'app-member-biodata',
  templateUrl: './member-biodata.component.html',
  styleUrls: ['./member-biodata.component.css']
})
export class MemberBiodataComponent implements OnInit {

  forBiodata:boolean|any;
  contact:boolean|any;

  constructor(private userService:UserService) { }

  ngOnInit(): void {
    if(this.userService.LoggedIn()&&window.location.href=='http://localhost:4200/biodata'){
      this.forBiodata=true;
    }else if(this.userService.LoggedIn()&&window.location.href=='http://localhost:4200/contact'){
      this.contact=true
    }
    else{
      this.forBiodata=false;
      this.contact=false
    }
  }

}
