import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Router } from '@angular/router';

import { Notification, DateUtils, SessionUtils } from './../../shared';
import { NotificationService } from './../../shared';
import { DialogService } from 'ng2-bootstrap-modal';
import { ConfirmComponent } from 'src/app/shared/components/confirm.component';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  animations: [routerTransition()]
})
export class NotificationsComponent implements OnInit {
  notifications: Notification[];

  constructor(
    private router: Router,
    private dialogService: DialogService,
    private notificationService: NotificationService,
    private dateUtils: DateUtils,
    public sessionUtils: SessionUtils
  ) {}

  ngOnInit() {
    this.getNotifications();
  }

  getNotifications(): void {
    this.notificationService.getNotificationsByRecipient(this.sessionUtils.getId(), this.sessionUtils.getRole())
      .subscribe(notifications => (this.notifications = notifications));
  }

  markAsRead(notification: Notification) {
    this.update(notification, true, false);
  }

  markAsDeleted(notification: Notification) {
    this.dialogService
      .addDialog(ConfirmComponent, {
        title: 'Confirm deletion',
        message: 'Are you sure you want to proceed?'
      })
      .subscribe(isConfirmed => {
        if (isConfirmed) {
          this.update(notification, false, true);
        }
      });
  }

  update(notification: Notification, markRead: boolean, markDeleted: boolean): void {
    if (markRead) {
      notification.marked_read = 1;
    }
    if (markDeleted) {
      notification.deleted = 1;
    }
    notification.date_modified = this.dateUtils.getCurrentDateString();
    this.notificationService.updateNotification(notification).subscribe(notif => {
      if (markDeleted) {
        this.getNotifications();
      }
    });
  }

  selectAll() {
    this.notifications.forEach(
      n => { n.selected = true; }
    );
  }

  markSelectedAsRead() {
    this.updateMultiple(true, false);
  }

  markSelectedAsDeleted() {
    this.dialogService
      .addDialog(ConfirmComponent, {
        title: 'Confirm deletion',
        message: 'Are you sure you want to proceed?'
      })
      .subscribe(isConfirmed => {
        if (isConfirmed) {
          this.updateMultiple(false, true);
        }
      });
  }

  updateMultiple(markRead: boolean, markDeleted: boolean): void {
    const selectedNotifs = this.notifications.filter(n => n.selected);
    if (selectedNotifs.length > 0) {
      selectedNotifs.forEach(n => {
        if (markRead) {
          n.marked_read = 1;
        }
        if (markDeleted) {
          n.deleted = 1;
        }
        n.date_modified = this.dateUtils.getCurrentDateString();
      });

      this.notificationService.updateMultipleNotifications(selectedNotifs).subscribe(result => {
        if (markDeleted) {
          this.getNotifications();
        }
      });
    }
  }

  goToDetail(notification: Notification): void {
    if (notification.marked_read === 0) {
      this.update(notification, true, false);
    }

    let routeBase = '';
    switch (notification.notification_for.trim().toLowerCase()) {
      case 'feedback': {
        routeBase = 'children/detail';
        break;
      }
      default: {
        routeBase = 'unknown';
        break;
      }
    }
    this.router.navigateByUrl(`${routeBase}/${notification.target_id}`);
  }

  getProperRoleDisplay(role: string) {
      switch (role) {
          case 'ROLE_ADMIN':
              return 'Administrator';
          case 'ROLE_EDUCATOR':
              return 'Educator';
          case 'ROLE_PARENT_GUARDIAN':
              return 'Parent / Guardian';
          default:
              return role;
      }
  }
}
