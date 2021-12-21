import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { UpdatePassword, User } from '../interfaces';
import { environment } from 'src/environments/environment';
import { AuthResponses, AuthResponseTypes, EmailResponseTypes } from '../responses';

@Injectable({ providedIn: 'root' })
export class AuthService {
  backendUrl = environment.backendUrl;

  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;
  public token: string | null;
  httpOptions: { headers: HttpHeaders; };

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User | null>(JSON.parse(localStorage.getItem('currentUser') || 'null'));
    this.currentUser = this.currentUserSubject.asObservable();
    this.token = null;
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization':  `Bearer ${this.token}` })
    };
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject?.value;
  }

  hello() {
    return this.http.get(`${this.backendUrl}`);
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
      .pipe(map(data => {
        console.log(data)
        return data;
      }));
  }

  signin(user: {
    email: string,
    password: string,
  }) {
    return this.http.post<{
      token: string,
      user: User,
      }> (`${this.backendUrl}/auth/login`, user)
      .pipe(map(data => {
        console.log(data)
        localStorage.setItem('currentUser', JSON.stringify(data.user));
        this.currentUserSubject.next(data.user);
        this.token = data.token;

        return user;
      }));
  }

  verifyDeletion(id: string, data: UpdatePassword): Observable<{
    message: string,
  }> {
    return this.http.get<{
        message: string,
      }> (`${this.backendUrl}/auth/verifyDeletion`, {
        ...this.httpOptions,
        params: new HttpParams().set('id', id)
      })
      .pipe(map(data => {

        return data;
      }));
  }


  resetPassword(id: string, password: string): Observable<{
    message: string,
  }> {
    return this.http.post<{
        message: string,
      }> (`${this.backendUrl}/auth/resetPassword`, password, {
        ...this.httpOptions,
        params: new HttpParams().set('id', id)
      })
      .pipe(map(data => {

        return data;
      }));
  }


  updatePassword(id: string, data: UpdatePassword): Observable<{
    message: string,
  }> {
    return this.http.post<{
        message: string,
      }> (`${this.backendUrl}/auth/resetPassword`, data, {
        ...this.httpOptions,
        params: new HttpParams().set('id', id)
      })
      .pipe(map(data => {

        return data;
      }));
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}

