import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Member } from '../../model/member.model';
import { MemberService } from '../../shared/member.service';
import { UserService } from '../../shared/user.service';
import { Location } from '@angular/common';

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
    private memberService: MemberService,
    private location:Location
  ) {}

  ngOnInit() {
    this.userService.autoLogout();
    this.memberService.getMembers().subscribe(
      (res: any) => {
        this.members = res.data_list;
      },
      (err) => {
        alert('Network Challenge');
      }
    );

    this.memberService.getCountries().subscribe(
      (res: any) => {
        console.log(res);
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
