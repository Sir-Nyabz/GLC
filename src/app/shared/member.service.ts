import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BnNgIdleService } from 'bn-ng-idle';
import { Observable } from 'rxjs';
import { ApiResponse } from '../model/api.response';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  getUrl = 'https://nyabz.pythonanywhere.com/admin-api/profile/asoremma/all/';
  sendMailUrl = 'https://nyabz.pythonanywhere.com/admin-api/reset-password/';

  headers= new HttpHeaders()
 
  constructor(private http: HttpClient, private router: Router, private bnIdle:BnNgIdleService) {}

  getMembers() : Observable<ApiResponse>{
    return this.http.get<ApiResponse>(this.getUrl,
        { 'headers': this.headers }
        );
  }

}
