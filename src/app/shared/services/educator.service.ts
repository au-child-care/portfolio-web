import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { SessionUtils, PasswordUtils, ApiHttpClient } from '../utilities';
import { Educator } from '../dtos';

@Injectable({ providedIn: 'root' })
export class EducatorService {

  private basePath = 'educator';

  constructor(
    private http: ApiHttpClient,
    public sessionUtils: SessionUtils,
    private passwordUtils: PasswordUtils) { }

  getEducators(): Observable<Educator[]> {
    return this.http.get<Educator[]>(`${this.basePath}?centre_id=${this.sessionUtils.getCentreId()}`);
  }

  getEducator(id: number): Observable<Educator> {
    return this.http.get<Educator>(`${this.basePath}/${id}`);
  }

  createEducator(educator: Educator): Observable<Educator> {
    return this.http.post<Educator>(`${this.basePath}`, educator);
  }

  updateEducator(educator: Educator): Observable<Educator> {
    const newEducator = this.passwordUtils.removeDummyPassword(educator);
    return this.http.put<Educator>(`${this.basePath}/${educator.id}`, newEducator);
  }
}
