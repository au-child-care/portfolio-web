import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';

import { EducatorAssignment } from '../dtos/educator-assignment.dto';
import { Educator } from '../dtos/educator.dto';
import { Child, Observation, TeachingPlan } from '../dtos';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class EducatorAssignmentService {

  private educatorAssignmentsUrl = 'http://localhost:8000/api/educatorassignment';  // URL to web api

  constructor(
    private http: HttpClient) { }

  getByChild(child_id: number): Observable<EducatorAssignment[]> {
    return this.http.get<EducatorAssignment[]>(`${this.educatorAssignmentsUrl}/byChild/${child_id}`);
  }

  getEducatorsByChild(child_id: number): Observable<Educator[]> {
    return this.http.get<Educator[]>(`${this.educatorAssignmentsUrl}/byChild/${child_id}/educators`);
  }

  getByEducator(educator_id: number): Observable<EducatorAssignment[]> {
    return this.http.get<EducatorAssignment[]>(`${this.educatorAssignmentsUrl}/byEducator/${educator_id}`);
  }

  getChildrenByEducator(educator_id: number): Observable<Child[]> {
    return this.http.get<Child[]>(`${this.educatorAssignmentsUrl}/byEducator/${educator_id}/children`);
  }

  getObservationsByAssignedEducator(educator_id: number): Observable<Observation[]> {
    return this.http.get<Observation[]>(`${this.educatorAssignmentsUrl}/byEducator/${educator_id}/observations`);
  }

  getTeachingPlansByAssignedEducator(educator_id: number): Observable<TeachingPlan[]> {
    return this.http.get<TeachingPlan[]>(`${this.educatorAssignmentsUrl}/byEducator/${educator_id}/teachingplans`);
  }

  setByEducator(educator_id: number, educatorassignments: EducatorAssignment[]): Observable<string> {
    return this.http.post<string>(`${this.educatorAssignmentsUrl}/byEducator/${educator_id}`, educatorassignments, httpOptions);
  }

  deleteByEducator(educator_id: number): Observable<string> {
    return this.http.delete<string>(`${this.educatorAssignmentsUrl}/byEducator/${educator_id}`, httpOptions);
  }

  deleteByChild(child_id: number): Observable<string> {
    return this.http.delete<string>(`${this.educatorAssignmentsUrl}/byChild/${child_id}`, httpOptions);
  }
}
