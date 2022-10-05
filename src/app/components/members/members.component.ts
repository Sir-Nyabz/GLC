import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
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
  regions: [] | any;
  branches: [] | any;
  member: Member | any;
  details: Member | any;
  detail: any;

  submitted: any;
  countries: any;
  country_uuid: any;
  region_uuid: any;
  church_branch_uuid: any;
  updateForm: any;
  @ViewChild('updateForm') form: NgForm | any
  region: any;

  constructor(
    private userService: UserService,
    private memberService: MemberService
  ) { }

  ngOnInit() {
    this.userService.autoLogout();
    // also recommended
    this.memberService.getMembers().subscribe({
      next: (v: any) => {
        this.members = v.data_list;
      },
      error: (e: any) => console.error(e)
    })


    this.memberService.getRegions(this.country_uuid).subscribe(
      (res: any) => {
        console.log(res.data)
        this.regions=res.data.regions;
        for(var i = 0; i < this.regions.length; i++){
          return this.region=this.regions[i].region;
          //localStorage.setItem('uuid', countries[i].country_uuid);
        }
       
      },
      (err) => {
        alert('Network Challenge');
      }
    );
    
    this.memberService.getBranches(this.region_uuid).subscribe(
      (res: any) => {
        this.branches=res.data.church_branches;
        console.log(res.data)
        },
      (err) => {
        alert('Network Challenge');
      }
    );
  }

  areyouamember() {
    if (this.details.is_member == true) {
      return this.detail = 'Yes'
    } else {
      return this.detail = 'No'
    }
  }

  viewIndividualRecord(asoreba_uuid: any) {
    this.memberService.viewMember(asoreba_uuid).subscribe({
      next: (v: any) => {
        this.details = v.data
        console.log(this.details)
        this.form.setValue({
          first_name: this.details.first_name,
          date_of_birth: this.details.date_of_birth,
          email: this.details.email,
          gender: this.details.gender,
          other_name: this.details.other_name,
          last_name: this.details.last_name,
          place_of_birth: this.details.place_of_birth,
          home_town: this.details.home_town,
          postal_address: this.details.postal_address,
          residential_address: this.details.residential_address,
          occupation: this.details.occupation,
          is_member: this.areyouamember(),
          number_of_children: this.details.number_of_children,
          marital_status: this.details.marital_status,
          church_branch:this.details.church_branches,
          region:this.details.regions
        })
      },
      error: (e: any) => console.error(e)
    })
  }

  deleteM(id: any) {
    this.memberService.deleteMember(id).subscribe({
      next: (v: any) => {
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

  updateRecord(form: NgForm) {
    console.log(form.value);
    this.memberService.updateMember(form.value)
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

