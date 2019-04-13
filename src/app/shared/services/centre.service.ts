import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';

import { CentreDetails } from '../dtos';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class CentreService {

  private centresUrl = 'http://localhost:8000/api/centre';  // URL to web api

  constructor(
    private http: HttpClient) { }

  getCentre(id: number): Observable<CentreDetails> {
    return this.http.get<CentreDetails>(`${this.centresUrl}/${id}`);
  }

  updateCentre(centre: CentreDetails): Observable<CentreDetails> {
    return this.http.put<CentreDetails>(`${this.centresUrl}/${centre.id}`, centre, httpOptions);
  }
}
