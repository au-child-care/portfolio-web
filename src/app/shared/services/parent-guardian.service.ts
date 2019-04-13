import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';

import { ParentGuardian } from '../dtos/parent-guardian.dto';
import { SessionUtils } from '../utilities';
import { PasswordUtils } from '../utilities/password.utils';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class ParentGuardianService {

  private parentsGuardiansUrl = 'http://localhost:8000/api/parentGuardian';  // URL to web api

  constructor(
    private http: HttpClient,
    private sessionUtils: SessionUtils,
    private passwordUtils: PasswordUtils) { }

  getParentsGuardians(): Observable<ParentGuardian[]> {
    return this.http.get<ParentGuardian[]>(`${this.parentsGuardiansUrl}?centre_id=${this.sessionUtils.getCentreId()}`);
  }

  getParentGuardian(id: number): Observable<ParentGuardian> {
    return this.http.get<ParentGuardian>(`${this.parentsGuardiansUrl}/${id}`);
  }

  createParentGuardian(parentGuardian: ParentGuardian): Observable<ParentGuardian> {
    return this.http.post<ParentGuardian>(`${this.parentsGuardiansUrl}`, parentGuardian, httpOptions);
  }

  updateParentGuardian(parentGuardian: ParentGuardian): Observable<ParentGuardian> {
    const newParentGuardian = this.passwordUtils.removeDummyPassword(parentGuardian);
    return this.http.put<ParentGuardian>(`${this.parentsGuardiansUrl}/${parentGuardian.id}`, newParentGuardian, httpOptions);
  }
}
