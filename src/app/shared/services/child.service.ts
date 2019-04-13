import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';

import { Child } from '../dtos/child.dto';
import { SessionUtils } from '../utilities';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class ChildService {

  private childrenUrl = 'http://localhost:8000/api/child';  // URL to web api

  constructor(
    private http: HttpClient,
    private sessionUtils: SessionUtils) { }

  getChildren(): Observable<Child[]> {
    return this.http.get<Child[]>(`${this.childrenUrl}?centre_id=${this.sessionUtils.getCentreId()}`);
  }

  getChild(id: number): Observable<Child> {
    return this.http.get<Child>(`${this.childrenUrl}/${id}`);
  }

  createChild(child: Child): Observable<Child> {
    return this.http.post<Child>(`${this.childrenUrl}`, child, httpOptions);
  }

  updateChild(child: Child): Observable<Child> {
    return this.http.put<Child>(`${this.childrenUrl}/${child.id}`, child, httpOptions);
  }
}
