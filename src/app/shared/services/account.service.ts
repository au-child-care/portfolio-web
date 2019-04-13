import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';

import { AuthenticateRequest, AccountDetails, AuthenticateResponse } from '../dtos';
import { PasswordUtils } from '../utilities/password.utils';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class AccountService {

  private accountsUrl = 'http://localhost:8000/api/account';  // URL to web api

  constructor(
    private http: HttpClient,
    private passwordUtils: PasswordUtils) { }

  authenticate(request: any): Observable<AuthenticateResponse> {
    return this.http.post<AuthenticateResponse>(`${this.accountsUrl}/authenticate`, request, httpOptions);
  }

  update(role: string, account: AccountDetails): Observable<any> {
    const newAccount = this.passwordUtils.removeDummyPassword(account);
    return this.http.put<any>(`${this.accountsUrl}/update/${role}`, newAccount, httpOptions);
  }
}
