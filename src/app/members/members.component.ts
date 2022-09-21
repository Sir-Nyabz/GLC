import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { ApiResponse } from '../model/api.response';
import { Member } from '../model/member.model';
import { MemberService } from '../shared/member.service';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css'],
})
export class MembersComponent implements OnInit {
  members: Observable<Member[]> | any;
  member: Member | any;

  submitted: any;

  constructor(
    private userService: UserService,
    private router: Router,
    private memberService: MemberService
  ) {}

  ngOnInit() {
    this.userService.autoLogout();
    this.memberService.getMembers().subscribe(
      (res: any) => {
        this.members = res;
        console.log(this.members);
        localStorage.setItem('token', res.token);
      },

      (err) => {
        alert('Network Challenge');
      }
    );
  }

  onSubmit(): void {
    throw new Error('Method not implemented.');
  }

  deleteEmployee(arg0: any) {
    throw new Error('Method not implemented.');
  }
  updateEmployee(arg0: any) {
    throw new Error('Method not implemented.');
  }
}
