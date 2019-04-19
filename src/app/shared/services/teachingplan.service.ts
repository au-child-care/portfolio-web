import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { TeachingPlan } from '../dtos';
import { SessionUtils, ApiHttpClient } from '../utilities';

@Injectable({ providedIn: 'root' })
export class TeachingPlanService {

  private basePath = 'teachingPlan';  // URL to web api

  constructor(
    private http: ApiHttpClient,
    public sessionUtils: SessionUtils) { }

  getTeachingPlans(): Observable<TeachingPlan[]> {
    return this.http.get<TeachingPlan[]>(`${this.basePath}?centre_id=${this.sessionUtils.getCentreId()}`);
  }

  getTeachingPlan(id: number): Observable<TeachingPlan> {
    return this.http.get<TeachingPlan>(`${this.basePath}/${id}`);
  }

  getTeachingPlansByEducator(educator_id: number): Observable<TeachingPlan[]> {
    return this.http.get<TeachingPlan[]>(`${this.basePath}/all/byEducator/${educator_id}`);
  }

  createTeachingPlan(teachingPlan: TeachingPlan): Observable<TeachingPlan> {
    return this.http.post<TeachingPlan>(`${this.basePath}`, teachingPlan);
  }

  updateTeachingPlan(teachingPlan: TeachingPlan): Observable<TeachingPlan> {
    return this.http.put<TeachingPlan>(`${this.basePath}/${teachingPlan.id}`, teachingPlan);
  }
}
