import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Child } from '../dtos/child.dto';
import { SessionUtils, ApiHttpClient } from '../utilities';

@Injectable({ providedIn: 'root' })
export class ChildService {

  private basePath = 'child';

  constructor(
    private http: ApiHttpClient,
    public sessionUtils: SessionUtils) { }

  getChildren(): Observable<Child[]> {
    return this.http.get<Child[]>(`${this.basePath}?centre_id=${this.sessionUtils.getCentreId()}`);
  }

  getChild(id: number): Observable<Child> {
    return this.http.get<Child>(`${this.basePath}/${id}`);
  }

  createChild(child: Child): Observable<Child> {
    return this.http.post<Child>(`${this.basePath}`, child);
  }

  updateChild(child: Child): Observable<Child> {
    return this.http.put<Child>(`${this.basePath}/${child.id}`, child);
  }
}
