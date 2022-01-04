// eslint-disable-next-line max-classes-per-file
import { Component, OnInit } from '@angular/core';
import {
  FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl,
  ValidationErrors
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { EmailResponses, EmailResponseTypes } from 'src/app/core/responses';
import { AuthService } from '../../core/services/auth.service';
import {CustomErrorStateMatcher} from '../../core/helpers/customErrorStateMatcher';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;

  loading = false;

  messageLoading = false;

  submitted = false;

  mCode: EmailResponseTypes | null = null;

  message: string;

  matcher = new CustomErrorStateMatcher();

  nameRegx = /^[a-zA-Z ]+$/;

  emailRegx = /^(([^<>+()\[\]\\.,;:\s@"-#$%&=]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
  ) {
    if (this.authService.currentUserValue) {
      this.router.navigate(['/user']);
    }
  }

  checkPasswords: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    const pass = group.get('password').value;
    const confirmPass = group.get('confirmPassword').value;
    return pass === confirmPass ? null : { notSame: true };
  };

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.pattern(this.nameRegx)]],
      email: [null, [Validators.required, Validators.pattern(this.emailRegx)]],
      password: [null, Validators.required],
      confirmPassword: [null, Validators.required]
    }, { validators: this.checkPasswords });
  }

  // convenience getter for easy access to form fields
  get f() { return this.signupForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.signupForm.invalid) {
      return;
    }

    this.loading = true;
    this.messageLoading = true;

    this.authService.signup({
      name: this.signupForm.value.name,
      email: this.signupForm.value.email,
      password: this.signupForm.value.password
    })
      .pipe(first())
      .subscribe(
        data => {
          console.log(data);
          this.mCode = data.mCode;
          this.message = EmailResponses[this.mCode];
          this.messageLoading = false;
        },
        error => {
          this.messageLoading = true;
          this.loading = false;
        }
      );
  }
}
