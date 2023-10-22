import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResetComponent } from './components/authentication/reset/reset.component';
import { ForgotComponent } from './components/forgot/forgot.component';
import { LoginComponent } from './components/login/login.component';
import { MemberBiodataComponent } from './components/member-biodata/member-biodata.component';
import { MembersComponent } from './components/members/members.component';
import { ContactComponent } from './contact/contact.component';
import { EditComponent } from './edit/edit.component';
import { LinkMembersComponent } from './components/link-members/link-members.component';
import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
  { path:'login',component:LoginComponent },
  { path:'authentication/reset-password/:token',component:ResetComponent },
  { path:'forgot',component:ForgotComponent },
  { path:'members',component:MembersComponent,canActivate:[AuthGuard] },
  { path:'edit',component:EditComponent,canActivate:[AuthGuard] },
  { path:'member-biodata',component:MemberBiodataComponent,canActivate:[AuthGuard] },
  { path:'contact',component:ContactComponent,canActivate:[AuthGuard] },
  { path:'link-members',component:LinkMembersComponent,canActivate:[AuthGuard] }

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
  EditComponent,
  ContactComponent,
  LinkMembersComponent
]
