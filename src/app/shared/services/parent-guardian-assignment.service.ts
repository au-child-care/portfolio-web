import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { ParentGuardianAssignment } from '../dtos/parent-guardian-assignment.dto';
import { ParentGuardian } from '../dtos/parent-guardian.dto';
import { Child, Observation, TeachingPlan } from '../dtos';
import { ApiHttpClient } from '../utilities';

@Injectable({ providedIn: 'root' })
export class ParentGuardianAssignmentService {

  private basePath = 'parentGuardianAssignment';  // URL to web api

  constructor(
    private http: ApiHttpClient) { }

  getByChild(child_id: number): Observable<ParentGuardianAssignment[]> {
    return this.http.get<ParentGuardianAssignment[]>(`${this.basePath}/byChild/${child_id}`);
  }

  getParentsGuardiansByChild(child_id: number): Observable<ParentGuardian[]> {
    return this.http.get<ParentGuardian[]>(`${this.basePath}/byChild/${child_id}/parentsGuardians`);
  }

  getByParentGuardian(parentGuardian_id: number): Observable<ParentGuardianAssignment[]> {
    return this.http.get<ParentGuardianAssignment[]>(`${this.basePath}/byParentGuardian/${parentGuardian_id}`);
  }

  getChildrenByParentGuardian(parentGuardian_id: number): Observable<Child[]> {
    return this.http.get<Child[]>(`${this.basePath}/byParentGuardian/${parentGuardian_id}/children`);
  }

  getObservationsByAssignedParentGuardian(parentGuardian_id: number): Observable<Observation[]> {
    return this.http.get<Observation[]>(`${this.basePath}/byParentGuardian/${parentGuardian_id}/observations`);
  }

  getTeachingPlansByAssignedParentGuardian(parentGuardian_id: number): Observable<TeachingPlan[]> {
    return this.http.get<TeachingPlan[]>(`${this.basePath}/byParentGuardian/${parentGuardian_id}/teachingplans`);
  }

  setByParentGuardian(parentGuardian_id: number, parentGuardianAssignments: ParentGuardianAssignment[]): Observable<string> {
    return this.http.post<string>(`${this.basePath}/byParentGuardian/${parentGuardian_id}`, parentGuardianAssignments);
  }

  deleteByParentGuardian(parentGuardian_id: number): Observable<string> {
    return this.http.delete<string>(`${this.basePath}/byParentGuardian/${parentGuardian_id}`);
  }

  deleteByChild(child_id: number): Observable<string> {
    return this.http.delete<string>(`${this.basePath}/byChild/${child_id}`);
  }
}
