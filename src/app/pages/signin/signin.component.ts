import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl, ValidationErrors, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import {ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthResponses } from 'src/app/core/responses';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  signinForm: FormGroup;
  loading = false;
  messageLoading = false;
  submitted = false;
  result = '';
  mCode: 'EMAIL_VERIFIED' | null = null;
  message: string;

  emailRegx = /^(([^<>+()\[\]\\.,;:\s@"-#$%&=]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
  ) {
    this.mCode = this.activatedRouter.snapshot.queryParamMap.get('mCode') as 'EMAIL_VERIFIED' | null;
    if (this.mCode) {
      this.message = AuthResponses[this.mCode];
    }
  }

  ngOnInit() {
    this.signinForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(this.emailRegx)]],
      password: [null, Validators.required],
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.signinForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.signinForm.invalid) {
      return;
    }

    this.loading = true;

    this.authService.signin({
          email: this.signinForm.value.email,
          password: this.signinForm.value.password,
      })
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['/user']);
        },
        error => {
          this.loading = false;
        });
  }
}
