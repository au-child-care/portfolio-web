import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationsRoutingModule } from './notifications-routing.module';
import { NotificationsComponent } from './notifications.component';
import { PageHeaderModule, SharedPipesModule } from './../../shared';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
    imports: [CommonModule, FormsModule, NotificationsRoutingModule, PageHeaderModule, ReactiveFormsModule, SharedPipesModule],
    declarations: [NotificationsComponent]
})
export class NotificationsModule {}
