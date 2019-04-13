import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';

import { Observation, RecommendationRequest, Recommendation } from '../dtos';
import { SessionUtils } from '../utilities';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class ObservationService {

  private observationsUrl = 'http://localhost:8000/api/observation';  // URL to web api

  constructor(
    private http: HttpClient,
    private sessionUtils: SessionUtils) { }

  getObservations(): Observable<Observation[]> {
    return this.http.get<Observation[]>(`${this.observationsUrl}?centre_id=${this.sessionUtils.getCentreId()}`);
  }

  getObservation(id: number): Observable<Observation> {
    return this.http.get<Observation>(`${this.observationsUrl}/${id}`);
  }

  getObservationsByEducator(educator_id: number): Observable<Observation[]> {
    return this.http.get<Observation[]>(`${this.observationsUrl}/all/byEducator/${educator_id}`);
  }

  createObservation(observation: Observation): Observable<Observation> {
    return this.http.post<Observation>(`${this.observationsUrl}`, observation, httpOptions);
  }

  updateObservation(observation: Observation): Observable<Observation> {
    return this.http.put<Observation>(`${this.observationsUrl}/${observation.id}`, observation, httpOptions);
  }

  getRecommendation(request: RecommendationRequest): Observable<Recommendation>  {
    return this.http.post<Recommendation>(`${this.observationsUrl}/classify`, request, httpOptions);
  }
}
