import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Feedback } from '../dtos/feedback.dto';
import { ApiHttpClient } from '../utilities';


@Injectable({ providedIn: 'root' })
export class FeedbackService {

  private basePath = 'feedback';  // URL to web api

  constructor(
    private http: ApiHttpClient) { }

  getFeedbackByChild(id: number): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(`${this.basePath}/child/${id}`);
  }

  getFeedback(id: number): Observable<Feedback> {
    return this.http.get<Feedback>(`${this.basePath}/${id}`);
  }

  createFeedback(feedback: Feedback): Observable<Feedback> {
    return this.http.post<Feedback>(`${this.basePath}`, feedback);
  }

  updateFeedback(feedback: Feedback): Observable<Feedback> {
    return this.http.put<Feedback>(`${this.basePath}/${feedback.id}`, feedback);
  }
}
