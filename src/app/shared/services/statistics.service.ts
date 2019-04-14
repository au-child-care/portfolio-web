import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { StatisticsAll, StatisticsChild, StatisticsEducator, StatisticsChildConsolidated, StatisticsEducatorTracking } from '../dtos';
import { SessionUtils, ApiHttpClient } from '../utilities';

@Injectable({ providedIn: 'root' })
export class StatisticsService {

  private basePath = 'statistics';  // URL to web api

  constructor(
    private http: ApiHttpClient,
    private sessionUtils: SessionUtils) { }

  getAll(): Observable<StatisticsAll> {
    return this.http.get<StatisticsAll>(`${this.basePath}/all/${this.sessionUtils.getCentreId()}`);
  }

  getForChild(child_id: number): Observable<StatisticsChild> {
    return this.http.get<StatisticsChild>(`${this.basePath}/child/${child_id}`);
  }

  getForEducator(educator_id: number): Observable<StatisticsEducator> {
    return this.http.get<StatisticsEducator>(`${this.basePath}/educator/${educator_id}`);
  }

  getAllEducatorTracking(): Observable<StatisticsEducatorTracking[]> {
    return this.http.get<StatisticsEducatorTracking[]>(`${this.basePath}/educator/tracking/all/${this.sessionUtils.getCentreId()}`);
  }

  getChildrenByEducator(educator_id: number): Observable<StatisticsChildConsolidated> {
    return this.http.get<StatisticsChildConsolidated>(`${this.basePath}/educator/${educator_id}/children`);
  }
}
