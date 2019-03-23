import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';

import { Observation } from '../dtos';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class ObservationService {

  private observationsUrl = 'http://localhost:8000/api/observation';  // URL to web api

  constructor(
    private http: HttpClient) { }

  getObservations(): Observable<Observation[]> {
    return this.http.get<Observation[]>(this.observationsUrl);
  }

  getObservation(id: number): Observable<Observation> {
    return this.http.get<Observation>(`${this.observationsUrl}/${id}`);
  }

  createObservation(observation: Observation): Observable<Observation> {
    return this.http.post<Observation>(`${this.observationsUrl}`, observation, httpOptions);
  }

  updateObservation(observation: Observation): Observable<Observation> {
    return this.http.put<Observation>(`${this.observationsUrl}/${observation.id}`, observation, httpOptions);
  }
}
