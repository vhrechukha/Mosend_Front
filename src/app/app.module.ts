import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomMaterialModule } from './shared/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SignupComponent } from './pages/signup/signup.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { MessageComponent } from './components/message/message.component';
import { SigninComponent } from './pages/signin/signin.component';
import { UserComponent } from './user/user.component';
import { ResendEmailComponent } from './pages/resendEmail/resendEmail.component';
import { FilesComponent } from './pages/files/files.component';
import { SharedFileComponent } from './pages/sharedFile/sharedFile.component';
import { Dialog } from './components/dialog/dialog.component';
import { FileFormComponent } from './components/fIleForm/fileForm.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    SignupComponent,
    SigninComponent,
    HomeComponent,
    FooterComponent,
    HeaderComponent,
    SpinnerComponent,
    MessageComponent,
    UserComponent,
    ResendEmailComponent,
    FilesComponent,
    SharedFileComponent,
    Dialog,
    FileFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    BrowserAnimationsModule,
    CustomMaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
