import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';

import { Milestone } from '../dtos';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class MilestoneService {

  private milestonesUrl = 'http://localhost:8000/api/milestone';  // URL to web api

  constructor(
    private http: HttpClient) { }

  getMilestones(): Observable<Milestone[]> {
    return this.http.get<Milestone[]>(this.milestonesUrl);
  }

  getMilestone(id: number): Observable<Milestone> {
    return this.http.get<Milestone>(`${this.milestonesUrl}/${id}`);
  }

  createMilestone(milestone: Milestone): Observable<Milestone> {
    return this.http.post<Milestone>(`${this.milestonesUrl}`, milestone, httpOptions);
  }

  updateMilestone(milestone: Milestone): Observable<Milestone> {
    return this.http.put<Milestone>(`${this.milestonesUrl}/${milestone.id}`, milestone, httpOptions);
  }
}
