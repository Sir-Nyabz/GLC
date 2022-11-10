import { DatePipe } from '@angular/common'
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, AbstractControl, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { concatMap, tap } from 'rxjs';
import { MemberService } from 'src/app/shared/member.service';
import { UserService } from '../../shared/user.service';
import { MembersComponent } from '../members/members.component';

@Component({
  selector: 'app-member-biodata',
  templateUrl: './member-biodata.component.html',
  styleUrls: ['./member-biodata.component.css']
})
export class MemberBiodataComponent implements OnInit {

  contactGroup:FormGroup;
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


  constructor(private datepipe:DatePipe, private memberService: MemberService,private formBuilder:FormBuilder,private router:Router) { 
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


    this.contactGroup=this.formBuilder.group({
      cemail:['',[Validators.required,Validators.email]],
      msisdn:['',Validators.required],
      voice_call:['',[Validators.required]],
      whatsapp:['',[Validators.required]],
      telegram:['',[Validators.required]]
    })
  }
  get emailid(){
    return this.biodataGroup.controls
  }

  get c(){
    return this.contactGroup.controls
  }

  ngOnInit(): void {
    $('#contactform').hide();

    this.memberService.getMembers().pipe(
      tap(res => {
        this.members = res.data_list
        console.log(res)
        for (var i = 0; i < this.members.length; i++) {
         
            //console.log(this.members[i].email)
            this.asoreba_uuid = this.members[i].asoreba_uuid
        }
      }),
      concatMap(res => this.memberService.viewMember(this.asoreba_uuid)),
      tap((res: any) => {
        console.log(res)
        }),
    ).subscribe()

    $('#contactbutton').click(function () {
      $('#contactform').show();
      $('#biodataform').hide();
    });

    $('#biodatabutton').click(function () {
      $('#contactform').hide();
      $('#biodataform').show();
    });

    this.getCountriesRegionsBranches();
  }

  addBiodata(){
    this.submitted=true;

    const first_name=this.biodataGroup.value.first_name;
    const last_name=this.biodataGroup.value.last_name;
    const other_name=this.biodataGroup.value.other_name;
    const gender="male";
    const l=this.biodataGroup.value.date_of_birth
    const date_of_birth= this.biodataGroup.value.date_of_birth
    const email = this.biodataGroup.value.email;
    const place_of_birth=this.biodataGroup.value.place_of_birth;
    const home_town=this.biodataGroup.value.home_town;
    const region_uuid=this.region_uuid;
    const postal_address=this.biodataGroup.value.postal_address;
    const residential_address=this.biodataGroup.value.residential_address;
    const occupation=this.biodataGroup.value.occupation;
    const membership_number='12';
    const number_of_children=this.biodataGroup.value.number_of_children;
    const marital_status=this.biodataGroup.value.number_of_children;
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
        alert('Success')
    },
    error: (e: any) => console.error(e),
   })
  }

  is_voiceCall(){
    if(this.contactGroup.value.voice_call=='Yes'){
      return true
    }else{
      return false
    }
  }

  is_Telegram(){
    if(this.contactGroup.value.telegram=='Yes'){
      return true
    }else{
      return false
    }
  }

  is_Whatsapp(){
    if(this.contactGroup.value.whatsapp=='Yes'){
      return true
    }else{
      return false
    }
  }

  addContact(){
    this.submitted=true;

    const msisdn=this.contactGroup.value.msisdn;
    const is_voice_call=this.is_voiceCall();
    const is_telegram=this.is_Telegram();
    const is_whatsapp=this.is_Whatsapp();
    const asoreba_uuid=this.asoreba_uuid

    this.memberService.addAsorebaContact(
      msisdn,
      is_voice_call,
      is_whatsapp,
      is_telegram,
      asoreba_uuid).subscribe()
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

