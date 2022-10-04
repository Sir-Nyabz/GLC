import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable,of } from 'rxjs';
import Swal from 'sweetalert2';
import { Member } from '../../model/member.model';
import { MemberService } from '../../shared/member.service';
import { UserService } from '../../shared/user.service';


@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css'],
})
export class MembersComponent implements OnInit {
  members: Observable<Member[]> | any;
  regions:[] | any;
  branches:[]|any;
  member: Member | any;

  submitted: any;
  countries: any;
  country_uuid:any;
  region_uuid: any;
  church_branch_uuid: any;

  constructor(
    private userService: UserService,
    private memberService: MemberService
  ) {}

  ngOnInit() {
    this.userService.autoLogout();
    // also recommended
    this.memberService.getMembers().subscribe({
  next: (v: any) => {
    this.members = v.data_list;
      },
  error: (e: any) => console.error(e)
})
    // this.memberService.getMembers().subscribe(
    //   (res: any) => {
    //     this.members = res.data_list;
    //   },
    //   (err) => {
    //     alert('Network Challenge');
    //   }
    // );
 
  }

  onSubmit(): void {
    throw new Error('Method not implemented.');
  }

  deleteM(id: any) {
    this.memberService.deleteMember(id).subscribe({
      next: (v: any) => {
        this.memberService.getMembers().subscribe({
          next: (v: any) => {
            this.members = v.data_list;
              },
          error: (e: any) => console.error(e)
        })
          },
      error: (e: any) => console.error(e)
    })
    // this.memberService.deleteMember(id).subscribe(
    //   (res: any) => {
    //     const swalWithBootstrapButtons = Swal.mixin({
    //       customClass: {
    //         confirmButton: 'btn btn-success',
    //         cancelButton: 'btn btn-danger'
    //       },
    //       buttonsStyling: false
    //     })
        
    //     swalWithBootstrapButtons.fire({
    //       title: 'Are you sure?',
    //       text: "You won't be able to revert this!",
    //       icon: 'warning',
    //       showCancelButton: true,
    //       confirmButtonText: 'Yes, delete it!',
    //       cancelButtonText: 'No, cancel!',
    //       reverseButtons: true
    //     }).then((result) => {
    //       if (result.isConfirmed) {
    //         swalWithBootstrapButtons.fire(
    //           'Deleted!',
    //           'Your file has been deleted.',
    //           'success'
    //         )
    //       } else if (
    //         /* Read more about handling dismissals below */
    //         result.dismiss === Swal.DismissReason.cancel
    //       ) {
    //         swalWithBootstrapButtons.fire(
    //           'Cancelled',
    //           'Your imaginary file is safe :)',
    //           'error'
    //         )
    //       }
    //     })
    //   },
    //   (err) => {
    //     alert('Network Challenge');
    //   }
    // );
  }

  updateRecord(form:NgForm) {
    const values: any[]=form.value
    this.memberService.updateMember(values)
    // .subscribe({
    //   next: (v: any) => {
    //     this.memberService.getMembers().subscribe({
    //       next: (v: any) => {
    //         this.members = v.data_list;
    //           },
    //       error: (e: any) => console.error(e)
    //     })
    //       },
    //   error: (e: any) => console.error(e)
    // })
  }
}
