import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';

import { EducatorAssignment } from '../dtos/educator-assignment.dto';
import { Educator } from '../dtos/educator.dto';

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

  setByEducator(educator_id: number, educatorassignments: EducatorAssignment[]): Observable<string> {
    return this.http.post<string>(`${this.educatorAssignmentsUrl}/byEducator/${educator_id}`, educatorassignments, httpOptions);
  }

  deleteByEducator(educator_id: number): Observable<string> {
    return this.http.delete<string>(`${this.educatorAssignmentsUrl}/byEducator/${educator_id}`, httpOptions);
  }
}
