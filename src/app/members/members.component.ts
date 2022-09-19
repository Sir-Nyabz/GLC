import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiResponse } from '../model/api.response';
import { Member } from '../model/member.model';
import { MemberService } from '../shared/member.service';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
deleteEmployee(arg0: any) {
throw new Error('Method not implemented.');
}
updateEmployee(arg0: any) {
throw new Error('Method not implemented.');
}
  members: Observable<ApiResponse>|any;
  member: Member = new Member();

onSubmit() {
throw new Error('Method not implemented.');
}
submitted: any;

  constructor(private userService:UserService,private router:Router,private memberService:MemberService) { }

  ngOnInit(): void{
   this.memberService.getMembers();
  }

}
