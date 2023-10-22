import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { data } from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { concatMap, take, tap } from 'rxjs';
import { MemberService } from '../../shared/member.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-link-members',
  templateUrl: './link-members.component.html',
  styleUrls: ['./link-members.component.css']
})
export class LinkMembersComponent implements OnInit {
  formGroup: FormGroup;
  submitted: boolean = false;
  asoreba_uuid: any;
  constructor(private datepipe: DatePipe,
    private memberService: MemberService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toaster: ToastrService) {
    this.formGroup = this.formBuilder.group({
      cemail: ['', [Validators.required, Validators.email]],
      msisdn: ['', Validators.required],
      voice_call: ['', [Validators.required]],
      whatsapp: ['', [Validators.required]],
      telegram: ['', [Validators.required]]
    })

  }

  get c() {
    return this.formGroup.controls
  }

  ngOnInit(): void {
    this.memberService.currentMember.pipe(take(1)).subscribe(
      data => {
        this.asoreba_uuid = data.asoreba_uuid;
        console.log(this.asoreba_uuid)
      },
    )
  }

 link_Members() {
    this.submitted = true;
    this.memberService.currentMember.pipe(take(1)).subscribe(
      data => {
        this.asoreba_uuid = data.asoreba_uuid;
      },
    )
    const msisdn = this.formGroup.value.msisdn;
    const is_voice_call = this.formGroup.value.voice_call;
    const is_telegram = this.formGroup.value.telegram;
    const is_whatsapp = this.formGroup.value.whatsapp;
    const asoreba_uuid = this.asoreba_uuid

    this.memberService.addAsorebaContact(
      msisdn,
      is_voice_call,
      is_whatsapp,
      is_telegram,
      asoreba_uuid).subscribe({
        next: (res: any) => {
          this.toaster.success('Contact added successfully');
          this.formGroup.reset();
          this.router.navigate(['/contact'])
        },
        error: (e: any) => {
          this.toaster.error('There was an error');
          this.formGroup.reset()
        },
      }
      )
  }
}
