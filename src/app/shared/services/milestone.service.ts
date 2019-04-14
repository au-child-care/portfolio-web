import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Milestone, MilestoneObservation } from '../dtos';
import { ApiHttpClient } from '../utilities';

@Injectable({ providedIn: 'root' })
export class MilestoneService {

  private basePath = 'milestone';  // URL to web api

  constructor(
    private http: ApiHttpClient) { }

  getByChild(child_id: number): Observable<Milestone[]> {
    return this.http.get<Milestone[]>(`${this.basePath}/byChild/${child_id}`);
  }

  setByChild(child_id: number, milestones: MilestoneObservation[]): Observable<string> {
    return this.http.post<string>(`${this.basePath}/byChild/${child_id}`, milestones);
  }
}
