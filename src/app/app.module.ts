import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BnNgIdleService } from 'bn-ng-idle';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AuthGuard } from './shared/auth.guard';
import { TokenInterceptorService } from './shared/token-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    NavbarComponent
  ],
  imports: [
   
    BrowserModule,
    AppRoutingModule,   
    FormsModule,
    HttpClientModule
  ],
  providers: [AuthGuard,BnNgIdleService,
  {
    provide:HTTP_INTERCEPTORS,
    useClass:TokenInterceptorService,
    multi:true
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
