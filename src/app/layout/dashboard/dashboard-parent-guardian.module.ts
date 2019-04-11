import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbCarouselModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

import { DashboardParentGuardianRoutingModule } from './dashboard-parent-guardian-routing.module';
import { DashboardParentGuardianComponent } from './dashboard-parent-guardian.component';
import { StatModule } from '../../shared';
import { ChartsModule } from 'ng2-charts';

@NgModule({
    imports: [
        CommonModule,
        NgbCarouselModule,
        NgbAlertModule,
        DashboardParentGuardianRoutingModule,
        StatModule,
        ChartsModule
    ],
    declarations: [
        DashboardParentGuardianComponent
    ]
})
export class DashboardParentGuardianModule {}
