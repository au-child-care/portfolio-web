import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';

import { TeachingPlan } from '../dtos';
import { SessionUtils } from '../utilities';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class TeachingPlanService {

  private teachingPlansUrl = 'http://localhost:8000/api/teachingPlan';  // URL to web api

  constructor(
    private http: HttpClient,
    private sessionUtils: SessionUtils) { }

  getTeachingPlans(): Observable<TeachingPlan[]> {
    return this.http.get<TeachingPlan[]>(`${this.teachingPlansUrl}?centre_id=${this.sessionUtils.getCentreId()}`);
  }

  getTeachingPlan(id: number): Observable<TeachingPlan> {
    return this.http.get<TeachingPlan>(`${this.teachingPlansUrl}/${id}`);
  }

  getTeachingPlansByEducator(educator_id: number): Observable<TeachingPlan[]> {
    return this.http.get<TeachingPlan[]>(`${this.teachingPlansUrl}/all/byEducator/${educator_id}`);
  }

  createTeachingPlan(teachingPlan: TeachingPlan): Observable<TeachingPlan> {
    return this.http.post<TeachingPlan>(`${this.teachingPlansUrl}`, teachingPlan, httpOptions);
  }

  updateTeachingPlan(teachingPlan: TeachingPlan): Observable<TeachingPlan> {
    return this.http.put<TeachingPlan>(`${this.teachingPlansUrl}/${teachingPlan.id}`, teachingPlan, httpOptions);
  }
}
