import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { SessionUtils, PasswordUtils, ApiHttpClient } from '../utilities';
import { ParentGuardian } from '../dtos';

@Injectable({ providedIn: 'root' })
export class ParentGuardianService {

  private basePath = 'parentGuardian';  // URL to web api

  constructor(
    private http: ApiHttpClient,
    private sessionUtils: SessionUtils,
    private passwordUtils: PasswordUtils) { }

  getParentsGuardians(): Observable<ParentGuardian[]> {
    return this.http.get<ParentGuardian[]>(`${this.basePath}?centre_id=${this.sessionUtils.getCentreId()}`);
  }

  getParentGuardian(id: number): Observable<ParentGuardian> {
    return this.http.get<ParentGuardian>(`${this.basePath}/${id}`);
  }

  createParentGuardian(parentGuardian: ParentGuardian): Observable<ParentGuardian> {
    return this.http.post<ParentGuardian>(`${this.basePath}`, parentGuardian);
  }

  updateParentGuardian(parentGuardian: ParentGuardian): Observable<ParentGuardian> {
    const newParentGuardian = this.passwordUtils.removeDummyPassword(parentGuardian);
    return this.http.put<ParentGuardian>(`${this.basePath}/${parentGuardian.id}`, newParentGuardian);
  }
}
