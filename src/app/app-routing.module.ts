import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { HomeComponent } from './pages/home/home.component';
import { ResendEmailComponent } from './pages/resendEmail/resendEmail.component';
import { SigninComponent } from './pages/signin/signin.component';
import { SignupComponent } from './pages/signup/signup.component';
import { UserComponent } from './user/user.component';
import { FilesComponent } from './pages/files/files.component';
import { SharedFileComponent } from './pages/sharedFile/sharedFile.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'user', component: UserComponent, canActivate: [AuthGuard] },
  { path: 'files', component: FilesComponent, canActivate: [AuthGuard] },
  { path: 'files/share', component: SharedFileComponent, canActivate: [AuthGuard] },
  { path: 'resendEmail', component: ResendEmailComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
