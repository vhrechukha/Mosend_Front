import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import {
  EmailResettingHeadlines,
  EmailResettingResponseTypes,
  EmailResponses,
  EmailResponseTypes
} from 'src/app/core/responses';
import { EmailService } from 'src/app/core/services/email.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './resendEmail.component.html',
  styleUrls: ['./resendEmail.component.css']
})
export class ResendEmailComponent implements OnInit {
  form: FormGroup;
  typeOfEmail: EmailResponseTypes;
  headline: EmailResettingHeadlines;
  message: string;
  emailRegx = /^(([^<>+()[\]\\.,;:\s@"-#$%&=]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private emailService: EmailService
  ) {
    if (this.authService.currentUserValue) {
      this.router.navigate(['/user']);
    }

    this.typeOfEmail = this.activatedRouter.snapshot.queryParamMap.get('type') as EmailResettingResponseTypes;
    this.headline = EmailResettingHeadlines[this.typeOfEmail];
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(this.emailRegx)]]
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    this.emailService.resendEmail({
      type: this.typeOfEmail,
      email: this.form.value.email
    })
      .pipe(first())
      .subscribe(
        data => {
          this.message = EmailResponses[data.mCode];
          console.log(this.message);
        }
      );
  }
}
