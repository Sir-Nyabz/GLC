import { Component, OnDestroy, OnInit, Output, ViewChild, Input } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { concatMap, Subject, Observable, of, pipe, tap } from 'rxjs';
import { Country } from 'src/app/model/country.model';
import { Region } from 'src/app/model/region.model';
import Swal from 'sweetalert2';
import { Member } from '../../model/member.model';
import { MemberService } from '../../shared/member.service';
import { UserService } from '../../shared/user.service';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
declare const $:any;

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css'],
})
export class MembersComponent implements OnDestroy,OnInit{
  
  dtOptions: any = {};
  updateGroup:FormGroup;
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
    private memberService: MemberService,
    private toaster:ToastrService,
    private formBuilder:FormBuilder
  ) { 
    this.updateGroup=this.formBuilder.group({
      first_name:['',Validators.required],
      email:['',[Validators.required,Validators.email]],
      last_name:['',Validators.required],
      other_name:[''],
      gender:['',Validators.required],
      date_of_birth:['',Validators.required],
      place_of_birth:['',Validators.required],
      home_town:['',Validators.required],
      region:['',Validators.required],
      postal_address:[''],
      residential_address:['',Validators.required],
      occupation:['',Validators.required],
      number_of_children:[''],
      marital_status:['',Validators.required],
      branch:['',Validators.required],
      is_member:['',Validators.required]
    })
  }
 
  members:Member[]=[];
  dtTrigger: Subject<any> = new Subject<any>();

  ngOnInit():void {
    this.userService.autoLogout();

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5
    };

    this.memberService.getMembers().subscribe((v:any)=>{
      this.members = v.data_list;
      this.dtTrigger.next(this.dtOptions);
      this.toaster.success('Worked')
    })
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
        this.member = v.data;
        console.log(this.member);
        this.updateGroup.setValue({
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
          branch: this.churchBranch(),
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

  updateRecord() {
    //console.log(form.value);
    //this.memberService.updateMember()
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

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
