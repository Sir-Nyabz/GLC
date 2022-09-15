import { HttpInterceptor } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { UserService } from '../shared/user.service';


@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private injector:Injector) { }

  intercept(req:any, next: any){
    let userService=this.injector.get(UserService)
    let tokenizedRequest=req.clone({
      setHeaders:{
        'ADMIN-ASOREBA-GLC':`${userService.getToken()}`
      }
    })
    return next.handle(tokenizedRequest)
  }
}
