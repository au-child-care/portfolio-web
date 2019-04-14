import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Notification } from '../dtos/notification.dto';
import { ApiHttpClient } from '../utilities';

@Injectable({ providedIn: 'root' })
export class NotificationService {

  private basePath = 'notification';  // URL to web api

  constructor(
    private http: ApiHttpClient) { }

  getNotificationsByRecipient(id: number, role: string): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.basePath}-recipient?recipient_id=${id}&recipient_role=${role}`);
  }

  updateMultipleNotifications(notifications: Notification[]): Observable<string> {
    return this.http.post<string>(`${this.basePath}-updates`, notifications);
  }

  updateNotification(notification: Notification): Observable<Notification> {
    return this.http.put<Notification>(`${this.basePath}/${notification.id}`, notification);
  }
}
