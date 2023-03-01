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
declare const $: any;

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css'],
})
export class MembersComponent implements OnDestroy, OnInit {

  dtOptions: any = {};
  printGroup: FormGroup;
  regions: any[] = [];
  branches: [] | any;
  member: Member | any;
  detail: any;
  details: any;
  members: Member[] = [];
  dtTrigger: Subject<any> = new Subject<any>();

  submitted: any;
  countries: any;
  country_uuid: Observable<any> | any;
  region_uuid: any;
  church_branch_uuid: any;
  updateForm: any;
  @ViewChild('printForm') form: NgForm | any;
  region: Region | any;
  country: Country | any;
  status: any;
  asoreba_uuid: any;
  branch: any;
  church_branches: any;
  branch_uuid: any;
  B: any;
  memberShip!: boolean;
  Yes: boolean = false;
  No: boolean = false;

  constructor(
    private userService: UserService,
    private memberService: MemberService,
    private toaster: ToastrService,
    private formBuilder: FormBuilder,
    private router: Router) {
    this.printGroup = this.formBuilder.group({
      membership_number: ['', Validators.required],
      first_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      last_name: ['', Validators.required],
      other_name: [''],
      gender: ['', Validators.required],
      date_of_birth: ['', Validators.required],
      place_of_birth: ['', Validators.required],
      home_town: ['', Validators.required],
      region: ['', Validators.required],
      postal_address: [''],
      residential_address: ['', Validators.required],
      occupation: ['', Validators.required],
      number_of_children: [''],
      marital_status: ['', Validators.required],
      branch: ['', Validators.required],
      is_member: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.userService.autoLogout();

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
    };
  }

  getProfile() {
    if ((document.getElementById('getprofile') as HTMLInputElement).value == 'all') {

      this.memberService.getAllMembers().subscribe((v: any) => {
        this.members = v.data_list;

        this.dtTrigger.next(this.dtOptions);
        $("#displayTable").dataTable().fnDestroy();
      })
    } else {

      this.memberService.getOnlyMembers().subscribe((v: any) => {
        this.members = v.data_list;

        this.dtTrigger.next(this.dtOptions);
        $("#displayTable").dataTable().fnDestroy()
      })
    }
  }

  navig_member_biodata() {
    this.router.navigate(['/member-biodata']).
      then(() => {
        window.location.reload();
      });
  }

  deleteM(asoreba_uuid: any) {
    this.memberService.deleteMember(
      asoreba_uuid).subscribe({
        next: (res: any) => {
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          );
          //this.router.navigate(['/members']);
          this.dtTrigger.next(this.dtOptions);
          $("#displayTable").dataTable().fnDestroy()
        },
        error: (e: any) => {
          this.toaster.error('There was an error');
        },
      }
      )

    // Swal.fire({
    //   title: 'Are you sure?',
    //   text: "You won't be able to revert this!",
    //   icon: 'warning',
    //   showCancelButton: true,
    //   confirmButtonText: 'Yes, delete it!',
    //   cancelButtonText: 'No, cancel!',
    //   reverseButtons: true
    // }).then((result) => {
    //   if (result.isConfirmed) {
        
    //     Swal.fire(
    //       'Deleted!',
    //       'Your file has been deleted.',
    //       'success'
    //     )
    //   } else if (
    //     result.dismiss === Swal.DismissReason.cancel
    //   ) {
    //     Swal.fire(
    //       'Cancelled',
    //       'Your imaginary file is safe :)',
    //       'error'
    //     )
    //   }
    // })
  }

  edit(membe: Member) {
    this.memberService.setMember(membe);
    this.router.navigate(['/edit'])
  }

  openDetails(membe: Member) {
    console.log(membe);
    this.memberShip = membe.is_member

    if (this.memberShip == true || this.memberShip == undefined) {
      this.Yes = true
    }

    if (this.memberShip == false) {
      this.No = true
    }

    this.printGroup.patchValue({
      membership_number: membe.membership_number,
      first_name: membe.first_name,
      date_of_birth: membe.date_of_birth,
      email: membe.email,
      gender: membe.gender,
      other_name: membe.other_name,
      last_name: membe.last_name,
      place_of_birth: membe.place_of_birth,
      home_town: membe.home_town,
      postal_address: membe.postal_address,
      residential_address: membe.residential_address,
      occupation: membe.occupation,
      number_of_children: membe.number_of_children,
      marital_status: membe.marital_status,
      branch: membe.church_branch_uuid,
      region: membe.region_uuid,
    });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
