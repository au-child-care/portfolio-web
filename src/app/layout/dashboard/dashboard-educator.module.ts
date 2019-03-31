import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbCarouselModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

import { DashboardEducatorRoutingModule } from './dashboard-educator-routing.module';
import { DashboardEducatorComponent } from './dashboard-educator.component';
import {
    TimelineComponent,
    NotificationComponent,
    ChatComponent
} from './components';
import { StatModule } from '../../shared';
import { ChartsModule } from 'ng2-charts';

@NgModule({
    imports: [
        CommonModule,
        NgbCarouselModule,
        NgbAlertModule,
        DashboardEducatorRoutingModule,
        StatModule,
        ChartsModule
    ],
    declarations: [
        DashboardEducatorComponent,
        TimelineComponent,
        NotificationComponent,
        ChatComponent
    ]
})
export class DashboardEducatorModule {}
