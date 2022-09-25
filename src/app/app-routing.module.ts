import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResetComponent } from './authentication/reset/reset.component';
import { ForgotComponent } from './forgot/forgot.component';
import { LoginComponent } from './login/login.component';
import { BiodataComponent } from './member-biodata/biodata/biodata.component';
import { ContactComponent } from './member-biodata/contact/contact.component';
import { MemberBiodataComponent } from './member-biodata/member-biodata.component';
import { MembersComponent } from './members/members.component';
import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
  {path:'login',component:LoginComponent},
  {path:'authentication/reset-password/:token',component:ResetComponent},
  {path:'forgot',component:ForgotComponent},
  {path:'members',component:MembersComponent,canActivate:[AuthGuard]},
  {
    path:'member_biodata',component:MemberBiodataComponent,
    children: [
      {path:'biodata',component:BiodataComponent},
      {path:'contact',component:ContactComponent}
    ],
    canActivate:[AuthGuard]},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents=[
  LoginComponent,
  ResetComponent,
  ForgotComponent,
  MembersComponent,
  MemberBiodataComponent,
  BiodataComponent,
  ContactComponent
]
