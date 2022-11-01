import { Component, OnInit } from '@angular/core';
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
  country_uuid: any;
  regions: []|any;
  church_branch_uuid: any;
  branches: any;
  region_uuid: any;
  country: any;
  countries: any;
  region: any;
  church_branches: any;
  branch: any;
  branch_uuid: any;
  

  constructor(private userService:UserService,private memberService:MemberService) { }

  ngOnInit(): void {
    $('#contactbutton').click(function() {
      $('#contactform').show();
      $('#biodataform').hide();
  });

  $('#biodatabutton').click(function() {
    $('#contactform').hide();
    $('#biodataform').show();
});

this.testConcatMap();

// this.memberService.getCountries().subscribe(
//   (res: any) => {
//     const countries=res.data_list
//     for(var i = 0; i < countries.length; i++){
//     // return this.country_uuid=countries[i].country_uuid;
//     //localStorage.setItem('uuid', countries[i].country_uuid);
//   }
//   },
//   (err) => {
//     alert('Network Challenge');
//   }
// );

// this.memberService.getRegions(this.country_uuid).subscribe(
//   (res: any) => {
//     this.regions=res.data.regions
   
//   },
//   (err) => {
//     alert('Network Challenge');
//   }
// );

// this.memberService.getBranches(this.region_uuid).subscribe(
//   (res: any) => {
//     console.log(res.data);
//     this.branches=res.data.church_branches
//     },
//   (err) => {
//     alert('Network Challenge');
//   }
// );
}

testConcatMap() {
  this.memberService.getCountries().pipe(
    tap(res => {
    
      const countries=res.data_list
      for (var i = 0; i < countries.length; i++) {
              
               this.country_uuid=countries[i].country_uuid
             }
    }),
    concatMap(res=>this.memberService.getRegions(this.country_uuid)),
    tap((res:any) => {
      
      this.regions=res.data.regions
      for (var i = 0; i < this.regions.length; i++) {
       
        this.region=this.regions[i].region
        this.region_uuid=this.regions[i].region_uuid
      }
    }),
    concatMap(res => this.memberService.getBranches(this.region_uuid)),
    tap((res:any) =>{
      console.log('Third result', res.data.church_branches)
      this.church_branches=res.data.church_branches;
      for (var i = 0; i < this.church_branches.length; i++) {
       
        this.branch=this.church_branches[i].branch
        this.branch_uuid=this.church_branches[i].branch_uuid
      }
    }),
  ).subscribe(resp => {
    console.log('final resp', resp)
  })
}

getRegions(){
  this.memberService.getRegions(this.country_uuid).subscribe(
    (res:any)=>{
      this.regions=res.data.regions
      for (var i = 0; i < this.regions.length; i++) {
        //console.log(this.countries[i]);
        this.region=this.regions[i].region
        this.region_uuid=this.regions[i].region_uuid
      }
    }
  )
}
}

