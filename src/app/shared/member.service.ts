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
  getMemberUrl = 'https://nyabz.pythonanywhere.com/admin-api/profile/asoremma/';
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

  resetPassword(password: string) {
    return this.http.put(
      this.updateMembersUrl,
      {
        password: password,
      }
    );
  }

  deleteMember(id:any){
    return this.http.delete(this.getAllMembersUrl + id)
  }

  updateMember(form:any){

  }

  getMember(id:any): Observable<any>{
    return this.http.post(this.getMemberUrl,{})
  }

  getCountries(): Observable<any> {
    return this.http.get<any>(this.countriesUrl);
  }

  getRegions(country_uuid:any){
    return this.http.post(this.regionsUrl,{country_uuid:"69334056-dcfd-49fe-8f82-8e4c277dd86c"} 
      )
  }

  getBranches(region_uuid:any){
    return this.http.post(this.branchesUrl,{region_uuid:"c5e76afb-ad28-4d84-ac5f-453928a5efb7"} 
      )
  }
 
}
