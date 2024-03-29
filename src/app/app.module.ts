import { CommonModule,DatePipe } from '@angular/common';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { DataTablesModule } from 'angular-datatables';
import { BnNgIdleService } from 'bn-ng-idle';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NgxPrintModule } from "ngx-print";

import { ToastrModule } from 'ngx-toastr';
import { AuthGuard } from './shared/auth.guard';
import { TokenInterceptorService } from './shared/token-interceptor.service';
import { IsLoaderComponent } from './is-loader/is-loader.component';
import { FooterComponent } from './footer/footer.component';




@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    NavbarComponent,
    IsLoaderComponent,
    FooterComponent,
   
  ],
  imports: [
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    BrowserModule,
    ReactiveFormsModule,
    CommonModule,
    AppRoutingModule,   
    FormsModule,
    HttpClientModule,
    DataTablesModule,
    NgxPrintModule,
    CommonModule
  ],
  providers: [AuthGuard,BnNgIdleService,
  {
    provide:HTTP_INTERCEPTORS,
    useClass:TokenInterceptorService,
    multi:true
  },
  DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
