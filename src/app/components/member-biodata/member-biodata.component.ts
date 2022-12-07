import { DatePipe } from '@angular/common'
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, AbstractControl, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { concatMap, tap } from 'rxjs';
import { MemberService } from 'src/app/shared/member.service';
import { UserService } from '../../shared/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-member-biodata',
  templateUrl: './member-biodata.component.html',
  styleUrls: ['./member-biodata.component.css']
})
export class MemberBiodataComponent implements OnInit {

  
  biodataGroup:FormGroup;
  submitted=false;
  country_uuid: any;
  regions: [] | any;
  church_branch_uuid: any;
  branches: any;
  region_uuid: any;
  country: any;
  countries: any;
  region: any;
  church_branches: any;
  branch: any;
  branch_uuid: any;
  members: any;
  asoreba_uuid: any;
  B: any;
  id: any;

  constructor(private datepipe:DatePipe,
     private memberService: MemberService,
     private formBuilder:FormBuilder,
     private router:Router, 
     private toaster:ToastrService) 
     { 
    this.biodataGroup=this.formBuilder.group({
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
  get emailid(){
    return this.biodataGroup.controls
  }

  ngOnInit(): void {

    this.memberService.getAllMembers().pipe(
      tap(res => {
        this.members = res.data_list
        
        for (var i = 0; i < this.members.length; i++) {
            this.asoreba_uuid = this.members[i].asoreba_uuid
        }
        //this.toaster.success('Data Retrieved')
      }),
      concatMap(res => this.memberService.viewMember(this.asoreba_uuid)),
      tap((res: any) => {
        
        }),
    ).subscribe()

    this.getCountriesRegionsBranches();
    
  }

  Gender(){
    if(this.biodataGroup.value.gender=='male'||this.biodataGroup.value.gender=='Male'){
      return (this.B='Male')
    }
    else if(this.biodataGroup.value.gender=='female'||this.biodataGroup.value.gender=='Female'){
      return (this.B='Female')
    }
    else{
      return (this.B='')
    }
  }

  membershipNumber(){
    
      const first_char='G';
      const second_char='L';
      const third_char='C';
      const fourth_char=Math.floor(Math.random() * 10);
      const fifth_char=Math.floor(Math.random() * 10);
      const sixth_char=Math.floor(Math.random() * 10);
      const seventh_char=Math.floor(Math.random() * 10);
      const eighth_char=Math.floor(Math.random() * 10);
  
      const ID=first_char+second_char+third_char+fourth_char+fifth_char+sixth_char+seventh_char+eighth_char;
       return ID;
    
  }

  addBiodata(){
    this.submitted=true;

    const first_name=this.biodataGroup.value.first_name;
    const last_name=this.biodataGroup.value.last_name;
    const other_name=this.biodataGroup.value.other_name;
    const gender=this.Gender();
    const date_of_birth= this.biodataGroup.value.date_of_birth
    const email = this.biodataGroup.value.email;
    const place_of_birth=this.biodataGroup.value.place_of_birth;
    const home_town=this.biodataGroup.value.home_town;
    const region_uuid=this.region_uuid;
    const postal_address=this.biodataGroup.value.postal_address;
    const residential_address=this.biodataGroup.value.residential_address;
    const occupation=this.biodataGroup.value.occupation;
    const membership_number=this.membershipNumber();
    const number_of_children=this.biodataGroup.value.number_of_children;
    const marital_status=this.biodataGroup.value.marital_status;
    const branch_uuid=this.branch_uuid;
    const is_member=this.biodataGroup.value.is_member;

      this.memberService.addAsorebaProfile(
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
          this.memberService.setMember(res);
          this.toaster.success('Profile added successfully');
          this.router.navigate(['/contact'])
          //console.log(res)
      },
      error: (e: any) => this.toaster.error('There was an error'),
     })
    
    }


  getCountriesRegionsBranches() {
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
}

