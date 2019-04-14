import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';

import { Administrator } from '../dtos/administrator.dto';
import { SessionUtils, ApiHttpClient, PasswordUtils } from '../utilities';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class AdministratorService {

  private basePath = 'administrator';

  constructor(
    private http: ApiHttpClient,
    private sessionUtils: SessionUtils,
    private passwordUtils: PasswordUtils) { }

  getAdministrators(): Observable<Administrator[]> {
    return this.http.get<Administrator[]>(`${this.basePath}?centre_id=${this.sessionUtils.getCentreId()}`);
  }

  getAdministrator(id: number): Observable<Administrator> {
    return this.http.get<Administrator>(`${this.basePath}/${id}`);
  }

  createAdministrator(admin: Administrator): Observable<Administrator> {
    return this.http.post<Administrator>(`${this.basePath}`, admin);
  }

  updateAdministrator(admin: Administrator): Observable<Administrator> {
    const newAdmin = this.passwordUtils.removeDummyPassword(admin);
    return this.http.put<Administrator>(`${this.basePath}/${admin.id}`, newAdmin);
  }
}
