import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';

import { AuthenticateRequest, AccountDetails, AuthenticateResponse } from '../dtos';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class AccountService {

  private accountsUrl = 'http://localhost:8000/api/account';  // URL to web api

  constructor(
    private http: HttpClient) { }

  authenticate(request: any): Observable<AuthenticateResponse> {
    return this.http.post<AuthenticateResponse>(`${this.accountsUrl}/authenticate`, request, httpOptions);
  }

  update(role: string, account: AccountDetails): Observable<any> {
    return this.http.put<any>(`${this.accountsUrl}/update/${role}`, account, httpOptions);
  }
}
