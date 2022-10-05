import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BnNgIdleService } from 'bn-ng-idle';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class MemberService {
  getAllMembersUrl = 'https://nyabz.pythonanywhere.com/admin-api/profile/asoremma/all/';
  viewMemberUrl = 'https://nyabz.pythonanywhere.com/admin-api/profile/asoreba/';
  countriesUrl ='https://nyabz.pythonanywhere.com/admin-api/setups/countries/';
  regionsUrl='https://nyabz.pythonanywhere.com/admin-api/setups/country/regions/';
  branchesUrl='https://nyabz.pythonanywhere.com/admin-api/setups/region/church_branches/';
  updateMembersUrl='https://nyabz.pythonanywhere.com/admin-api/profile/asoreba/'

  constructor(
    private http: HttpClient,
    private router: Router,
    private bnIdle: BnNgIdleService
  ) {}

  getToken() {
    return localStorage.getItem('ADMIN-ASOREBA-GLC');
  }

  getMembers(): Observable<any> {
    return this.http.get<any>(this.getAllMembersUrl);
  }

  deleteMember(id:any){
    return this.http.delete(this.getAllMembersUrl + id)
  }

  updateMember(form:any){
    return this.http.put(
      this.updateMembersUrl,
      {
        form: form,
      }
    );
  }

  viewMember(asoreba_uuid:any) {
    return this.http.post(this.viewMemberUrl,{asoreba_uuid:asoreba_uuid})
  }

  getCountries(): Observable<any> {
    return this.http.get<any>(this.countriesUrl);
  }

  getRegions(country_uuid:any){
    return this.http.post(this.regionsUrl,{country_uuid:country_uuid} 
      )
  }

  getBranches(region_uuid:any){
    return this.http.post(this.branchesUrl,{region_uuid:region_uuid} 
      )
  }
 
}
