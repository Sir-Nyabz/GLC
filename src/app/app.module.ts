import { CommonModule,DatePipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { DataTablesModule } from 'angular-datatables';
import { Ng2SearchPipeModule } from "ng2-search-filter";
import { Ng2OrderModule } from 'ng2-order-pipe';
import { NgxPaginationModule } from "ngx-pagination";
import { BnNgIdleService } from 'bn-ng-idle';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';

import { ToastrModule } from 'ngx-toastr';
import { AuthGuard } from './shared/auth.guard';
import { TokenInterceptorService } from './shared/token-interceptor.service';
import { IsLoaderComponent } from './is-loader/is-loader.component';
import { FooterComponent } from './footer/footer.component';
import { ContactComponent } from './contact/contact.component';



@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    NavbarComponent,
    IsLoaderComponent,
    FooterComponent,
    ContactComponent
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
    Ng2SearchPipeModule,
    NgxPaginationModule
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
