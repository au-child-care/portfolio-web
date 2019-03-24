import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';

import { Milestone, MilestoneObservation } from '../dtos';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class MilestoneService {

  private milestonesUrl = 'http://localhost:8000/api/milestone';  // URL to web api

  constructor(
    private http: HttpClient) { }

  getByChild(child_id: number): Observable<Milestone[]> {
    return this.http.get<Milestone[]>(`${this.milestonesUrl}/byChild/${child_id}`);
  }

  setByChild(child_id: number, milestones: MilestoneObservation[]): Observable<string> {
    return this.http.post<string>(`${this.milestonesUrl}/byChild/${child_id}`, milestones, httpOptions);
  }
}
