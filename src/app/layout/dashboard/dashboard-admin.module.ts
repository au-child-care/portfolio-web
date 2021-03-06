import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbCarouselModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

import { DashboardAdminRoutingModule } from './dashboard-admin-routing.module';
import { DashboardAdminComponent } from './dashboard-admin.component';
import { StatModule } from '../../shared';
import { ChartsModule } from 'ng2-charts';

@NgModule({
    imports: [
        CommonModule,
        NgbCarouselModule,
        NgbAlertModule,
        DashboardAdminRoutingModule,
        StatModule,
        ChartsModule
    ],
    declarations: [
        DashboardAdminComponent
    ]
})
export class DashboardAdminModule {}
