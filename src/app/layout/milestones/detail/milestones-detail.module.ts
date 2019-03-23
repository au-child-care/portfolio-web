import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MilestonesDetailRoutingModule } from './milestones-detail-routing.module';
import { MilestonesDetailComponent } from './milestones-detail.component';
import { PageHeaderModule } from '../../../shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MilestonesDetailRoutingModule,
        PageHeaderModule],
    declarations: [MilestonesDetailComponent]
})
export class MilestonesDetailModule {}
