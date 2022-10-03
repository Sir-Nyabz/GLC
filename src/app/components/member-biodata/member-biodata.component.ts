import { Component, OnInit } from '@angular/core';
import { MemberService } from 'src/app/shared/member.service';
import { UserService } from '../../shared/user.service';

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


this.memberService.getCountries().subscribe(
  (res: any) => {
    const countries=res.data_list
    for(var i = 0; i < countries.length; i++){
    // return this.country_uuid=countries[i].country_uuid;
    //localStorage.setItem('uuid', countries[i].country_uuid);
  }
  },
  (err) => {
    alert('Network Challenge');
  }
);

this.memberService.getRegions(this.country_uuid).subscribe(
  (res: any) => {
    this.regions=res.data.regions
  },
  (err) => {
    alert('Network Challenge');
  }
);

this.memberService.getBranches(this.church_branch_uuid).subscribe(
  (res: any) => {
    //console.log(res.data.church_branches);
    this.branches=res.data.church_branches
    },
  (err) => {
    alert('Network Challenge');
  }
);
}
}

