import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { data } from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { concatMap, take, tap } from 'rxjs';
import { MemberService } from '../shared/member.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  country_uuid: any;
  regions: any;
  region: any;
  region_uuid: any;
  church_branches: any;
  branch: any;
  branch_uuid: any;
  updateGroup:FormGroup;
  member: any;
  detail!: string;
  status: any;
  B: any;
  members: any;
  asoreba_uuid: any;
  Branch: any;
  submitted: boolean=false;
  m: any;
  sex: any;
  marital: any;
  first_name: any;
  reg_uuid: any;
  membershipNumber: any;
  memberor: any;

  constructor(private memberService: MemberService,private formBuilder:FormBuilder,private toaster:ToastrService,private router:Router) { 
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

  get u(){
    return this.updateGroup.controls
  }

  ngOnInit(): void {
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
          this.reg_uuid = this.regions[i].region_uuid
        }
      }),
      concatMap(res => this.memberService.getBranches(this.reg_uuid)),
      tap((res: any) => {
        this.church_branches = res.data.church_branches;
        for (var i = 0; i < this.church_branches.length; i++) {

          this.branch = this.church_branches[i].branch
          this.branch_uuid = this.church_branches[i].branch_uuid
        }
      }),
    ).subscribe()

    this.getMember();
  }

  getMember(){
    this.memberService.currentMember.pipe(take(1)).subscribe(
      data=>{
        if(data){
        this.asoreba_uuid=data.asoreba_uuid;
        this.membershipNumber=data.membership_number;
        this.memberor=data.is_member
        this.updateGroup.setValue({
          first_name: data.first_name,
          date_of_birth: data.date_of_birth,
          email: data.email,
          gender: data.gender,
          other_name: data.other_name,
          last_name: data.last_name,
          place_of_birth: data.place_of_birth,
          home_town: data.home_town,
          postal_address: data.postal_address,
          residential_address: data.residential_address,
          occupation: data.occupation,
          is_member: data.is_member,
          number_of_children: data.number_of_children,
          marital_status: data.marital_status,
          branch: data.church_branch_uuid,
          region: data.region_uuid,
        });
      }else{
        this.router.navigate(['/members'])
      }
      },
    )
  }
  
  updateRecord() {
    this.submitted=true;
    const asoreba_uuid=this.asoreba_uuid
    const first_name=this.updateGroup.value.first_name;
    const last_name=this.updateGroup.value.last_name;
    const other_name=this.updateGroup.value.other_name;
    const gender=this.updateGroup.value.gender;
    const date_of_birth= this.updateGroup.value.date_of_birth
    const email = this.updateGroup.value.email;
    const place_of_birth=this.updateGroup.value.place_of_birth;
    const home_town=this.updateGroup.value.home_town;
    const region_uuid=this.updateGroup.value.region;
    const postal_address=this.updateGroup.value.postal_address;
    const residential_address=this.updateGroup.value.residential_address;
    const occupation=this.updateGroup.value.occupation;
    const membership_number=this.membershipNumber;
    const number_of_children=this.updateGroup.value.number_of_children;
    const marital_status=this.updateGroup.value.number_of_children;
    const branch_uuid=this.branch_uuid;
    const is_member=this.updateGroup.value.is_member;
    this.memberService.updateMember(
      asoreba_uuid,
      branch_uuid,
      date_of_birth,
      email,
      first_name,
      gender,
      home_town,
      is_member,
      last_name,
      marital_status,
      membership_number,
      number_of_children,
      occupation,
      other_name,
      place_of_birth,
      postal_address,
      region_uuid,
      residential_address
    ).subscribe({
      next:(res:any)=>{
        this.toaster.success('Profile updated successfully')
        this.router.navigate(['/members']);
        this.updateGroup.reset()
    },
    error: (e: any) => this.toaster.error('There was an error'),
   })
  }
}
