import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';

import { StatisticsAll, StatisticsChild, StatisticsEducator } from '../dtos';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class StatisticsService {

  private statisticsUrl = 'http://localhost:8000/api/statistics';  // URL to web api

  constructor(
    private http: HttpClient) { }

  getAll(): Observable<StatisticsAll> {
    return this.http.get<StatisticsAll>(`${this.statisticsUrl}/all`);
  }

  getForChild(child_id: number): Observable<StatisticsChild> {
    return this.http.get<StatisticsChild>(`${this.statisticsUrl}/child/${child_id}`);
  }

  getForEducator(educator_id: number): Observable<StatisticsEducator> {
    return this.http.get<StatisticsEducator>(`${this.statisticsUrl}/educator/${educator_id}`);
  }
}
