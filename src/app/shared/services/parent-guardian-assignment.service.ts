import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';

import { ParentGuardianAssignment } from '../dtos/parent-guardian-assignment.dto';
import { ParentGuardian } from '../dtos/parent-guardian.dto';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class ParentGuardianAssignmentService {

  private parentGuardianAssignmentsUrl = 'http://localhost:8000/api/parentGuardianAssignment';  // URL to web api

  constructor(
    private http: HttpClient) { }

  getByChild(child_id: number): Observable<ParentGuardianAssignment[]> {
    return this.http.get<ParentGuardianAssignment[]>(`${this.parentGuardianAssignmentsUrl}/byChild/${child_id}`);
  }

  getParentsGuardiansByChild(child_id: number): Observable<ParentGuardian[]> {
    return this.http.get<ParentGuardian[]>(`${this.parentGuardianAssignmentsUrl}/byChild/${child_id}/parentsGuardians`);
  }

  getByParentGuardian(parentGuardian_id: number): Observable<ParentGuardianAssignment[]> {
    return this.http.get<ParentGuardianAssignment[]>(`${this.parentGuardianAssignmentsUrl}/byParentGuardian/${parentGuardian_id}`);
  }

  setByParentGuardian(parentGuardian_id: number, parentGuardianAssignments: ParentGuardianAssignment[]): Observable<string> {
    return this.http.post<string>(`${this.parentGuardianAssignmentsUrl}/byParentGuardian/${parentGuardian_id}`, parentGuardianAssignments, httpOptions);
  }

  deleteByParentGuardian(parentGuardian_id: number): Observable<string> {
    return this.http.delete<string>(`${this.parentGuardianAssignmentsUrl}/byParentGuardian/${parentGuardian_id}`, httpOptions);
  }
}
