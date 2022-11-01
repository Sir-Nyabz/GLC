import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { data } from 'jquery';
import { concatMap, map, Observable, of, pipe, tap } from 'rxjs';
import { Country } from 'src/app/model/country.model';
import { Region } from 'src/app/model/region.model';
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
  regions: any[] = [];
  branches: [] | any;
  member: Member | any;
  details: Member | any;
  detail: any;

  submitted: any;
  countries: any;
  country_uuid: Observable<any> | any;
  region_uuid: any;
  church_branch_uuid: any;
  updateForm: any;
  @ViewChild('updateForm') form: NgForm | any;
  region: Region | any;
  country: Country | any;

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
      error: (e: any) => console.error(e),
    });
  }

  

  areyouamember(): "Yes" | "No" {
    if (this.details.is_member == true) {
      return (this.detail = 'Yes');
    } else {
      return (this.detail = 'No');
    }
  }

  checkRegion() {
    // console.log(this.country.country_uuid);
    // this.memberService.getRegions(this.country.country_uuid).subscribe(
    //   (res: any) => {
    //     console.log(res.data);
    //     this.regions = res.data.regions;
    //     for (var i = 0; i < this.regions.length; i++) {
    //       //this.region_uuid=this.regions[i].region_uuid;
    //       this.region = this.regions[i];
    //     }
    //   },
    //   (err) => {
    //     alert('Network Challenge');
    //   }
    // );
    // for (var i = 0; i < this.regions.length; i++) {
    //   if ((this.details.region_uuid && this.region.region) == this.regions[i]) {
    //     return this.region.region;
    //   } else {
    //     alert('Region and Region Uuid mismatch');
    //   }
    // }
  }

  viewIndividualRecord(asoreba_uuid: any) {
    this.memberService.viewMember(asoreba_uuid).subscribe({
      next: (v: any) => {
        console.log(v)
        this.details = v.data;
        console.log(this.details);
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
          // is_member: this.areyouamember(),
          is_member: true,
          number_of_children: this.details.number_of_children,
          marital_status: this.details.marital_status,
          // church_branch: this.details.church_branches,
          church_branch: '',
          // region: this.checkRegion(),
          region: '',
        });
      },
      error: (e: any) => console.error(e),
    });
  }

  deleteM(id: any) {
    this.memberService.deleteMember(id).subscribe({
      next: (v: any) => {},
      error: (e: any) => console.error(e),
    });
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
    this.memberService.updateMember(form.value);
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
