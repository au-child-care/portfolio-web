import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';

import { Feedback } from '../dtos/feedback.dto';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class FeedbackService {

  private feedbackUrl = 'http://localhost:8000/api/feedback';  // URL to web api

  constructor(
    private http: HttpClient) { }

  getFeedbackByChild(id: number): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(`${this.feedbackUrl}/child/${id}`);
  }

  getFeedback(id: number): Observable<Feedback> {
    return this.http.get<Feedback>(`${this.feedbackUrl}/${id}`);
  }

  createFeedback(feedback: Feedback): Observable<Feedback> {
    return this.http.post<Feedback>(`${this.feedbackUrl}`, feedback, httpOptions);
  }

  updateFeedback(feedback: Feedback): Observable<Feedback> {
    return this.http.put<Feedback>(`${this.feedbackUrl}/${feedback.id}`, feedback, httpOptions);
  }
}
