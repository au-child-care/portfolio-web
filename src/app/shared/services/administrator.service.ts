import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';

import { Administrator } from '../dtos/administrator.dto';
import { SessionUtils } from '../utilities';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class AdministratorService {

  private administratorsUrl = 'http://localhost:8000/api/administrator';  // URL to web api

  constructor(
    private http: HttpClient,
    private sessionUtils: SessionUtils) { }

  getAdministrators(): Observable<Administrator[]> {
    return this.http.get<Administrator[]>(`${this.administratorsUrl}?centre_id=${this.sessionUtils.getCentreId()}`);
  }

  getAdministrator(id: number): Observable<Administrator> {
    return this.http.get<Administrator>(`${this.administratorsUrl}/${id}`);
  }

  createAdministrator(admin: Administrator): Observable<Administrator> {
    return this.http.post<Administrator>(`${this.administratorsUrl}`, admin, httpOptions);
  }

  updateAdministrator(admin: Administrator): Observable<Administrator> {
    return this.http.put<Administrator>(`${this.administratorsUrl}/${admin.id}`, admin, httpOptions);
  }
}
