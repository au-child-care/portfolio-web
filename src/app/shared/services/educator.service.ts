import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';

import { Educator } from '../dtos/educator.dto';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class EducatorService {

  private educatorsUrl = 'http://localhost:8000/api/educator';  // URL to web api

  constructor(
    private http: HttpClient) { }

  getEducators(): Observable<Educator[]> {
    return this.http.get<Educator[]>(this.educatorsUrl);
  }

  getEducator(id: number): Observable<Educator> {
    return this.http.get<Educator>(`${this.educatorsUrl}/${id}`);
  }

  createEducator(educator: Educator): Observable<Educator> {
    return this.http.post<Educator>(`${this.educatorsUrl}`, educator, httpOptions);
  }

  updateEducator(educator: Educator): Observable<Educator> {
    return this.http.put<Educator>(`${this.educatorsUrl}/${educator.id}`, educator, httpOptions);
  }
}
