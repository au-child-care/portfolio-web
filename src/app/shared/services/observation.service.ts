import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Observation, RecommendationRequest, Recommendation } from '../dtos';
import { SessionUtils, ApiHttpClient } from '../utilities';

@Injectable({ providedIn: 'root' })
export class ObservationService {

  private basePath = 'observation';  // URL to web api

  constructor(
    private http: ApiHttpClient,
    private sessionUtils: SessionUtils) { }

  getObservations(): Observable<Observation[]> {
    return this.http.get<Observation[]>(`${this.basePath}?centre_id=${this.sessionUtils.getCentreId()}`);
  }

  getObservation(id: number): Observable<Observation> {
    return this.http.get<Observation>(`${this.basePath}/${id}`);
  }

  getObservationsByEducator(educator_id: number): Observable<Observation[]> {
    return this.http.get<Observation[]>(`${this.basePath}/all/byEducator/${educator_id}`);
  }

  createObservation(observation: Observation): Observable<Observation> {
    return this.http.post<Observation>(`${this.basePath}`, observation);
  }

  updateObservation(observation: Observation): Observable<Observation> {
    return this.http.put<Observation>(`${this.basePath}/${observation.id}`, observation);
  }

  getRecommendation(request: RecommendationRequest): Observable<Recommendation>  {
    return this.http.post<Recommendation>(`${this.basePath}/classify`, request);
  }
}
