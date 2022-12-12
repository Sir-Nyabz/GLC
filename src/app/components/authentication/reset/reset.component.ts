import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { UserService } from '../../../shared/user.service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {

  resetGroup: FormGroup;
  constructor(private route: ActivatedRoute, private userService: UserService, private router: Router, private toaster: ToastrService,
    private formBuilder: FormBuilder) {
    this.resetGroup = this.formBuilder.group({
      new_password: ['', [Validators.required, Validators.email]],
      confirm_new_password: ['', [Validators.required, Validators.email]]
    })
  }

  get r() {
    return this.resetGroup.controls
  }

  ngOnInit(): void {
    const snapshot = this.route.snapshot.params['token']
    localStorage.setItem('ADMIN-ASOREBA-GLC', snapshot)
  }

  reset() {
    const new_password = this.resetGroup.value.new_password;
    const confirm_new_password = this.resetGroup.value.confirm_new_password;

    if (confirm_new_password == new_password) {
      this.userService.resetPassword(new_password).subscribe((res: any) => {
        if (res.status == 200) {
          this.toaster.success('Password reset successsful')
          this.router.navigate(['/login']);
          localStorage.removeItem('token');
        }
        else {
          this.toaster.error('Password reset unsuccesssful')
          this.router.navigate(['/forgot']);
          localStorage.removeItem('token');
        }
      },
        err => {
          this.toaster.error('Network Challenge')
          localStorage.removeItem('token');
        })

    } else {
      this.toaster.error('Passwords mismatch')
      this.resetGroup.reset()
    }
  }

}
