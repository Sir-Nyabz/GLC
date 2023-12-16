import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { data } from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { concatMap, take, tap } from 'rxjs';
import { Member } from '../../model/member.model';
import { MemberService } from '../../shared/member.service';
import { CustomValidationService } from '../../shared/custom-validation.service';
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-link-members',
  templateUrl: './link-members.component.html',
  styleUrls: ['./link-members.component.css']
})
export class LinkMembersComponent implements OnInit {
  yes:boolean | undefined;
  userForm: FormGroup;
  submitted: boolean = false;
  asoreba_uuid: any;
  members: any;
  asoreba_one_uuid: any;
  asoreba_two_uuid: any;

  constructor(private datepipe: DatePipe,
    private memberService: MemberService,
    private fb: FormBuilder,
    private router: Router,
    private toaster: ToastrService,
    private customValidator:CustomValidationService    ) {
    this.userForm =this.fb.group({
      is_member:["",[Validators.required]],
      select_relation:["",Validators.required],
      relationship_status:["",Validators.required],
    })

  }

  hideDiv: boolean = true; // Initially hidden

  // get c() {
  //   return this.linkGroup.controls
  // }

  get is_member(){
    return this.userForm.get("is_member")
  }

  get relationship_status(){
    return this.userForm.get("relationship_status")
  }

  get select_relation(){
    return this.userForm.get("select_relation")
  }


  ngOnInit(): void {
    this.memberService.getAllMembers()
    .subscribe(
      {
        next: (res: any) => {
          this.members = res.data_list;

          for (var i = 0; i < this.members.length; i++) {
            this.asoreba_two_uuid = this.members[i].asoreba_uuid;
            //console.log("second "+this.asoreba_two_uuid)
          }
        },
        error: (e: any) => this.toaster.error('There was an error'),
      }
    );

    
  }

  
  isChecked: boolean = true;
  boxDisplay: string = 'block';

  handleRadioClick(isChecked: boolean) {
    this.isChecked = isChecked;
    this.boxDisplay = isChecked ? 'block' : 'none';
  }

  linkMembers() {
    this.submitted = true;
    this.hideDiv=false

    this.memberService.currentMember.pipe(take(1)).subscribe(
      data => {
        this.asoreba_one_uuid = data.asoreba_uuid;
        console.log("first "+this.asoreba_one_uuid)
      },
    )

    const asoreba_one_uuid=this.asoreba_one_uuid;
    const asoreba_two_uuid=this.asoreba_two_uuid;
    const relationship=this.userForm.value.relationship_status;
    
    // this.memberService.currentMember.pipe(take(1)).subscribe(
    //   data => {
    //     this.asoreba_two_uuid = this.formGroup.value.select_relation;
    //     console.log("second "+this.asoreba_two_uuid)
    //   },
    // )
    //const ismember = this.formGroup.value.example;

    this.memberService.createRelationship(
      asoreba_one_uuid,
      asoreba_two_uuid,
      relationship
    ).subscribe({
      next: (res: any) => {
        //this.toaster.success('Profile added successfully');
        console.log(asoreba_one_uuid+" first");
        console.log(asoreba_two_uuid+" second");
        console.log(relationship+" rela")
        this.router.navigate(['/contact']);
        console.log(res)
      },
      error: (e: any) => this.toaster.error('There was an error'),
    });


    
          this.router.navigate(['/contact'])
      
  }

  autoFillAddress(){
  }

  clear(){
    this.userForm.reset()
    //this.username.setValue("")
  }


}


