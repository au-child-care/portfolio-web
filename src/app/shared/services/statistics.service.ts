import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';

import { StatisticsAll, StatisticsChild, StatisticsEducator, StatisticsChildConsolidated, StatisticsEducatorTracking } from '../dtos';
import { SessionUtils } from '../utilities';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class StatisticsService {

  private statisticsUrl = 'http://localhost:8000/api/statistics';  // URL to web api

  constructor(
    private http: HttpClient,
    private sessionUtils: SessionUtils) { }

  getAll(): Observable<StatisticsAll> {
    return this.http.get<StatisticsAll>(`${this.statisticsUrl}/all/${this.sessionUtils.getCentreId()}`);
  }

  getForChild(child_id: number): Observable<StatisticsChild> {
    return this.http.get<StatisticsChild>(`${this.statisticsUrl}/child/${child_id}`);
  }

  getForEducator(educator_id: number): Observable<StatisticsEducator> {
    return this.http.get<StatisticsEducator>(`${this.statisticsUrl}/educator/${educator_id}`);
  }

  getAllEducatorTracking(): Observable<StatisticsEducatorTracking[]> {
    return this.http.get<StatisticsEducatorTracking[]>(`${this.statisticsUrl}/educator/tracking/all/${this.sessionUtils.getCentreId()}`);
  }

  getChildrenByEducator(educator_id: number): Observable<StatisticsChildConsolidated> {
    return this.http.get<StatisticsChildConsolidated>(`${this.statisticsUrl}/educator/${educator_id}/children`);
  }
}
