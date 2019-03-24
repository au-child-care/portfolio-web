import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MilestonesDetailRoutingModule } from './milestones-detail-routing.module';
import { MilestonesDetailComponent } from './milestones-detail.component';
import { PageHeaderModule } from '../../../shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MilestonesDetailRoutingModule,
        PageHeaderModule,
        NgbModule],
    declarations: [MilestonesDetailComponent]
})
export class MilestonesDetailModule {}
