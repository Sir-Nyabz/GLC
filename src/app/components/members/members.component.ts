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
  detail: any;
  details:any

  submitted: any;
  countries: any;
  country_uuid: Observable<any> | any;
  region_uuid: any;
  church_branch_uuid: any;
  updateForm: any;
  @ViewChild('updateForm') form: NgForm | any;
  region: Region | any;
  country: Country | any;
  status: any;
  asoreba_uuid: any;
  branch: any;
  church_branches: any;
  branch_uuid: any;
  B: any;

  constructor(
    private userService: UserService,
    private memberService: MemberService
  ) { }

  ngOnInit() {
    this.userService.autoLogout();
    // also recommended
    this.memberService.getMembers().pipe(
      tap(
      (v: any) => {
        this.members = v.data_list;
        for (var i = 0; i < this.members.length; i++) {
         
          //console.log(this.members[i].email)
          this.asoreba_uuid = this.details[i].asoreba_uuid
      }
    }
    ),
    concatMap(res => this.memberService.viewMember(this.asoreba_uuid)),
    tap((res: any) => {
      this.member=res.data

      console.log(res)
      }),
    ).subscribe();


    this.memberService.getCountries().pipe(
      tap(res => {

        const countries = res.data_list
        for (var i = 0; i < countries.length; i++) {

          this.country_uuid = countries[i].country_uuid
        }
      }),
      concatMap(res => this.memberService.getRegions(this.country_uuid)),
      tap((res: any) => {

        this.regions = res.data.regions
        for (var i = 0; i < this.regions.length; i++) {

          this.region = this.regions[i].region
          this.region_uuid = this.regions[i].region_uuid
        }
      }),
      concatMap(res => this.memberService.getBranches(this.region_uuid)),
      tap((res: any) => {
        this.church_branches = res.data.church_branches;
        for (var i = 0; i < this.church_branches.length; i++) {

          this.branch = this.church_branches[i].branch
          this.branch_uuid = this.church_branches[i].branch_uuid
        }
      }),
    ).subscribe()
  }

  churchBranch(){
    if(this.member.church_branch=='Head Office - Dansoma'){
      return (this.B='Head Office')
    }
    else{
      return (this.status='Office')
    }
  }

  Gender(){
    if(this.member.gender=='male'){
      return (this.B='Male')
    }
    else if(this.member.gender=='female'){
      return (this.B='Female')
    }
    else{
      return (this.B='')
    }
  }

maritalStatus(){
  if(this.member.marital_status==0){
    return (this.status='Single')
  }
  else if(this.member.marital_status==1){
    return (this.status='Married')
  }
  else if(this.member.marital_status==2){
    return (this.status='Divorced')
  }
  else if(this.member.marital_status==3){
    return (this.status='Separated')
  }
  else if(this.member.marital_status==4){
    return (this.status='Widowed')
  }
  else{
    return (this.status='')
  }
}
  

  areyouamember(): "Yes" | "No" {
    if (this.member.is_member == true) {
      return (this.detail = 'Yes');
    } else {
      return (this.detail = 'No');
    }
  }


  viewIndividualRecord(asoreba_uuid: any) {
    this.memberService.viewMember(asoreba_uuid).subscribe({
      next: (v: any) => {
        console.log(v)
        this.member = v.data;
        console.log(this.member);
        this.form.setValue({
          first_name: this.member.first_name,
          date_of_birth: this.member.date_of_birth,
          email: this.member.email,
          gender: this.Gender(),
          other_name: this.member.other_name,
          last_name: this.member.last_name,
          place_of_birth: this.member.place_of_birth,
          home_town: this.member.home_town,
          postal_address: this.member.postal_address,
          residential_address: this.member.residential_address,
          occupation: this.member.occupation,
          is_member: this.areyouamember(),
          number_of_children: this.member.number_of_children,
          marital_status: this.maritalStatus(),
          church_branch: this.churchBranch(),
          region: this.member.region,
        });
      },
      error: (e: any) => console.error(e),
    });
  }

  deleteM(id: any) {
    this.memberService.deleteMember(id).subscribe({
      next: (v: any) => { },
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
    //console.log(form.value);
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
