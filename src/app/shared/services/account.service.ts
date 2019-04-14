import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { AccountDetails, AuthenticateResponse } from '../dtos';
import { ApiHttpClient, PasswordUtils } from '../utilities';

@Injectable({ providedIn: 'root' })
export class AccountService {

  private basePath = 'account';

  constructor(
    private http: ApiHttpClient,
    private passwordUtils: PasswordUtils) { }

  authenticate(request: any): Observable<AuthenticateResponse> {
    return this.http.post<AuthenticateResponse>(`${this.basePath}/authenticate`, request);
  }

  update(role: string, account: AccountDetails): Observable<any> {
    const newAccount = this.passwordUtils.removeDummyPassword(account);
    return this.http.put<any>(`${this.basePath}/update/${role}`, newAccount);
  }
}
