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
  yes:boolean | undefined;
  formGroup: FormGroup;
  submitted: boolean = false;
  asoreba_uuid: any;
  members: any;

  constructor(private datepipe: DatePipe,
    private memberService: MemberService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toaster: ToastrService) {
    this.formGroup = this.formBuilder.group({
      cemail: ['', [Validators.required, Validators.email]],
      example: ['', Validators.required]
    })

  }

  isElementDisabled: boolean = true; // Initially disabled

  get c() {
    return this.formGroup.controls
  }

  ngOnInit(): void {
    this.memberService.getAllMembers()
    .subscribe(
      {
        next: (res: any) => {
          this.members = res.data_list;
        },
        error: (e: any) => this.toaster.error('There was an error'),
      }
    );
  }

  hideDiv: boolean = true; // Initially hidden
  isChecked: boolean = true;
  boxDisplay: string = 'block';

  handleRadioClick(isChecked: boolean) {
    this.isChecked = isChecked;
    this.boxDisplay = isChecked ? 'block' : 'none';
  }

 linkMembers() {
    this.submitted = true;
    this.memberService.currentMember.pipe(take(1)).subscribe(
      data => {
        this.asoreba_uuid = data.asoreba_uuid;
      },
    )
    const ismember = this.formGroup.value.example;

    
          this.router.navigate(['/contact'])
      
  }
}
function handleRadioClick(): (this: HTMLInputElement, ev: MouseEvent) => any {
  throw new Error('Function not implemented.');
}

