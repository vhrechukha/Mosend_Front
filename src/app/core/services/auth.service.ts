import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  UpdatePassword, SigninResponse, User, Message
} from '../interfaces';
import { environment } from '../../../environments/environment';
import { EmailResponseTypes } from '../responses';

@Injectable({ providedIn: 'root' })
export class AuthService {
  backendUrl = environment.backendUrl;

  private currentUserSubject: BehaviorSubject<User | null>;

  private httpOptions: { headers: HttpHeaders; };

  public currentUser: Observable<User | null>;

  public token: string | null;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User | null>(
      JSON.parse(localStorage.getItem('currentUser') || 'null')
    );
    this.currentUser = this.currentUserSubject.asObservable();
    this.token = localStorage.getItem('token');
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`
      })
    };
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject?.value;
  }

  public get currentToken(): string | null {
    console.log(localStorage.getItem('token'));
    return localStorage.getItem('token');
  }

  signup(user: {
    name: string;
    email: string;
    password: string;
  }): Observable<{
    mCode: EmailResponseTypes,
  }> {
    return this.http.post<{
        mCode: EmailResponseTypes,
      }>(`${this.backendUrl}/auth/register`, user)
      .pipe(map(data => data));
  }

  signin(user: {
    email: string,
    password: string,
  }): Observable<SigninResponse> {
    return this.http
      .post<SigninResponse>(`${this.backendUrl}/auth/login`, user)
      .pipe(map(data => {
        localStorage.setItem('currentUser', JSON.stringify(data.user));

        this.currentUserSubject.next(data.user);
        this.token = data.token;

        return data;
      }));
  }

  verifyDeletion(id: string, data: UpdatePassword): Observable<Message> {
    return this.http
      .get<Message>(`${this.backendUrl}/auth/verifyDeletion`, {
        ...this.httpOptions,
        params: new HttpParams().set('id', id)
      })
      .pipe(map(data => data));
  }

  resetPassword(id: string, password: string): Observable<Message> {
    return this.http
      .post<Message>(`${this.backendUrl}/auth/resetPassword`, password, {
        ...this.httpOptions,
        params: new HttpParams().set('id', id)
      })
      .pipe(map(data => data));
  }

  updatePassword(id: string, data: UpdatePassword): Observable<Message> {
    return this.http
      .post<Message>(`${this.backendUrl}/auth/resetPassword`, data, {
        ...this.httpOptions,
        params: new HttpParams().set('id', id)
      })
      .pipe(map(data => data));
  }

  logout() {
    localStorage.removeItem('currentUser');

    this.currentUserSubject.next(null);
  }
}
