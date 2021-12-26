import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Message, ResendEmailRequest } from '../interfaces';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';
import { EmailResettingResponseTypes } from '../responses';

@Injectable({ providedIn: 'root' })
export class EmailService {
  backendUrl = environment.backendUrl;

  private httpOptions: { headers: HttpHeaders; };

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.authService.currentToken}`
      })
    };
  }

  resendEmail({
    type,
    email
  }: ResendEmailRequest): Observable<{
    mCode: EmailResettingResponseTypes
  }> {
    return this.http
      .get<{
        mCode: EmailResettingResponseTypes
      }>(`${this.backendUrl}/email/resendEmail`, {
        params: new HttpParams()
          .set('type', type)
          .set('email', email)
      })
      .pipe(map(data => data));
  }

  sendDeletionEmail(): Observable<Message> {
    return this.http
      .get<Message>(`${this.backendUrl}/email/resendEmail`, this.httpOptions)
      .pipe(map(data => data));
  }
}
