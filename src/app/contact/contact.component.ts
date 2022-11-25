import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { MemberService } from '../shared/member.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contactGroup:FormGroup;
  submitted: boolean=false;
  asoreba_uuid: any;
  constructor(private datepipe:DatePipe,
    private memberService: MemberService,
    private formBuilder:FormBuilder,
    private router:Router, 
    private toaster:ToastrService) {
    this.contactGroup=this.formBuilder.group({
      cemail:['',[Validators.required,Validators.email]],
      msisdn:['',Validators.required],
      voice_call:['',[Validators.required]],
      whatsapp:['',[Validators.required]],
      telegram:['',[Validators.required]]
    })
  
   }

   get c(){
    return this.contactGroup.controls
  }
  
  ngOnInit(): void {
   
  }

  addContact(){
    this.submitted=true;
    this.memberService.currentMember.pipe(take(1)).subscribe(
      data=>{
        this.asoreba_uuid=data.asoreba_uuid;
      },
    )
    const msisdn=this.contactGroup.value.msisdn;
    const is_voice_call=this.contactGroup.value.voice_call;
    const is_telegram=this.contactGroup.value.telegram();
    const is_whatsapp=this.contactGroup.value.whatsapp;
    const asoreba_uuid=this.asoreba_uuid

    this.memberService.addAsorebaContact(
      msisdn,
      is_voice_call,
      is_whatsapp,
      is_telegram,
      asoreba_uuid).subscribe({
        next:(res:any)=>{
          this.toaster.success('Contact added successfully');
          this.contactGroup.reset();
          // console.log(res)
      },
      error: (e: any) => {this.toaster.error('There was an error');
      this.contactGroup.reset()
    },
     }
      )
  }

}
