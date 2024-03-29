import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BnNgIdleService } from 'bn-ng-idle';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class MemberService {
  getAllMembersUrl = 'https://nyabz.pythonanywhere.com/admin-api/profile/asoremma/all/';
  getOnlyMembersUrl= 'https://nyabz.pythonanywhere.com/admin-api/profile/asoremma/'
  countriesUrl ='https://nyabz.pythonanywhere.com/admin-api/setups/countries/';
  regionsUrl='https://nyabz.pythonanywhere.com/admin-api/setups/country/regions/';
  branchesUrl='https://nyabz.pythonanywhere.com/admin-api/setups/region/church_branches/';
  updateMembersUrl='https://nyabz.pythonanywhere.com/admin-api/profile/asoreba/';
  addProfileUrl='https://nyabz.pythonanywhere.com/admin-api/profile/add/asoreba/';
  addContactUrl='https://nyabz.pythonanywhere.com/admin-api/profile/asoreba/contact/';
  viewRecordUrl="https://nyabz.pythonanywhere.com/admin-api/profile/asoreba/";
  deleteRecordUrl="https://nyabz.pythonanywhere.com/admin-api/profile/asoreba/"
  createRelationshipUrl="https://nyabz.pythonanywhere.com/admin-api/profile/add/relationship/"

  constructor(
    private http: HttpClient,
    private router: Router,
    private bnIdle: BnNgIdleService
  ) {}

  private receiveMembers=new BehaviorSubject<any>(false);
  
  currentMember=this.receiveMembers.asObservable();

  setMember(object:any){
    this.receiveMembers.next(object)
  }
  
  getToken() {
    return localStorage.getItem('ADMIN-ASOREBA-GLC');
  }

  getOnlyMembers(): Observable<any> {
    return this.http.get<any>(this.getOnlyMembersUrl);
  }

  getAllMembers(): Observable<any> {
    return this.http.get<any>(this.getAllMembersUrl);
  }

  deleteMember(asoreba_uuid:any){
    return this.http.delete(this.deleteRecordUrl,{body: {asoreba_uuid:asoreba_uuid}})
  }

  updateMember(
    asoreba_uuid: any,
    branch_uuid: string,
    date_of_birth: string,
    email: string,
    first_name: string,
    gender: string,
    home_town: string,
    is_member:any,
    last_name: string,
    marital_status: string,
    membership_number: any,
    number_of_children: string,
    occupation: string,
    other_name: string,
    place_of_birth: string,
    postal_address: string,
    region_uuid:string,
    residential_address: string){
    return this.http.put(
      this.updateMembersUrl,
      {
        asoreba_uuid:asoreba_uuid,
        branch_uuid: branch_uuid,
        date_of_birth: date_of_birth,
        email: email,
        first_name: first_name,
        gender: gender,
        home_town: home_town,
        is_member:is_member,
        last_name: last_name,
        marital_status: marital_status,
        membership_number: membership_number,
        number_of_children: number_of_children,
        occupation: occupation,
        other_name: other_name,
        place_of_birth: place_of_birth,
        postal_address: postal_address,
        region_uuid:region_uuid,
        residential_address: residential_address
      }
    );
  }

  viewMember(asoreba_uuid:any) {
    return this.http.post(this.viewRecordUrl,{asoreba_uuid:asoreba_uuid})
  }

  getCountries(): Observable<any> {
    return this.http.get<any>(this.countriesUrl);
  }

  getRegions(country_uuid:any){
    return this.http.post(this.regionsUrl,{country_uuid:country_uuid} 
      )
  }

  getBranches(region_uuid:any){
    return this.http.post(this.branchesUrl,
      {region_uuid:region_uuid} 
      )
  }

  addAsorebaProfile(
    branch_uuid: string,
    date_of_birth: string,
    email: string,
    first_name: string,
    gender: string,
    home_town: string,
    is_member:string,
    last_name: string,
    marital_status: string,
    membership_number: any,
    number_of_children: string,
    occupation: string,
    other_name: string,
    place_of_birth: string,
    postal_address: string,
    region_uuid:string,
    residential_address: string,
  ){
    return this.http.post(this.addProfileUrl,
      {
        branch_uuid: branch_uuid,
        date_of_birth: date_of_birth,
        email: email,
        first_name: first_name,
        gender: gender,
        home_town: home_town,
        is_member:is_member,
        last_name: last_name,
        marital_status: marital_status,
        membership_number: membership_number,
        number_of_children: number_of_children,
        occupation: occupation,
        other_name: other_name,
        place_of_birth: place_of_birth,
        postal_address: postal_address,
        region_uuid:region_uuid,
        residential_address: residential_address,
      } 
      )
  }

  addAsorebaContact(
    msisdn: string,
    is_voice_call: boolean,
    is_telegram: boolean,
    is_whatsapp: boolean,
    asoreba_uuid:string
  ){
    return this.http.post(this.addContactUrl,
      {
        msisdn: msisdn,
        is_voice_call: is_voice_call,
        is_whatsapp: is_whatsapp,
        is_telegram: is_telegram,
        asoreba_uuid:asoreba_uuid
      } 
      )
  }

  createRelationship(
    asoreba_one_uuid: string,
    asoreba_two_uuid:string,
    relationship:string
  ){
    return this.http.post(this.createRelationshipUrl,
      {
        asoreba_one_uuid: asoreba_one_uuid,
        asoreba_two_uuid: asoreba_two_uuid,
        relationship:relationship
      } 
      )
  }
 
}
