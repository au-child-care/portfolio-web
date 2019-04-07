import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';

import { Notification } from '../dtos/notification.dto';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class NotificationService {

  private notificationUrl = 'http://localhost:8000/api/notification';  // URL to web api

  constructor(
    private http: HttpClient) { }

  getNotificationsByRecipient(id: number, role: string): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.notificationUrl}-recipient?recipient_id=${id}&recipient_role=${role}`);
  }

  updateMultipleNotifications(notifications: Notification[]): Observable<string> {
    return this.http.post<string>(`${this.notificationUrl}-updates`, notifications, httpOptions);
  }

  updateNotification(notification: Notification): Observable<Notification> {
    return this.http.put<Notification>(`${this.notificationUrl}/${notification.id}`, notification, httpOptions);
  }
}
