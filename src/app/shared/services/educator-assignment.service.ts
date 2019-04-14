import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { EducatorAssignment } from '../dtos/educator-assignment.dto';
import { Educator } from '../dtos/educator.dto';
import { Child, Observation, TeachingPlan } from '../dtos';
import { ApiHttpClient } from '../utilities';

@Injectable({ providedIn: 'root' })
export class EducatorAssignmentService {

  private bastPath = 'educatorassignment';

  constructor(
    private http: ApiHttpClient) { }

  getByChild(child_id: number): Observable<EducatorAssignment[]> {
    return this.http.get<EducatorAssignment[]>(`${this.bastPath}/byChild/${child_id}`);
  }

  getEducatorsByChild(child_id: number): Observable<Educator[]> {
    return this.http.get<Educator[]>(`${this.bastPath}/byChild/${child_id}/educators`);
  }

  getByEducator(educator_id: number): Observable<EducatorAssignment[]> {
    return this.http.get<EducatorAssignment[]>(`${this.bastPath}/byEducator/${educator_id}`);
  }

  getChildrenByEducator(educator_id: number): Observable<Child[]> {
    return this.http.get<Child[]>(`${this.bastPath}/byEducator/${educator_id}/children`);
  }

  getObservationsByAssignedEducator(educator_id: number): Observable<Observation[]> {
    return this.http.get<Observation[]>(`${this.bastPath}/byEducator/${educator_id}/observations`);
  }

  getTeachingPlansByAssignedEducator(educator_id: number): Observable<TeachingPlan[]> {
    return this.http.get<TeachingPlan[]>(`${this.bastPath}/byEducator/${educator_id}/teachingplans`);
  }

  setByEducator(educator_id: number, educatorassignments: EducatorAssignment[]): Observable<string> {
    return this.http.post<string>(`${this.bastPath}/byEducator/${educator_id}`, educatorassignments);
  }

  deleteByEducator(educator_id: number): Observable<string> {
    return this.http.delete<string>(`${this.bastPath}/byEducator/${educator_id}`);
  }

  deleteByChild(child_id: number): Observable<string> {
    return this.http.delete<string>(`${this.bastPath}/byChild/${child_id}`);
  }
}
