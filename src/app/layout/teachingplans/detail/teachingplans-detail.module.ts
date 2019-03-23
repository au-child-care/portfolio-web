import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeachingPlansDetailRoutingModule } from './teachingPlans-detail-routing.module';
import { TeachingPlansDetailComponent } from './teachingPlans-detail.component';
import { PageHeaderModule } from '../../../shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TeachingPlansDetailRoutingModule,
        PageHeaderModule],
    declarations: [TeachingPlansDetailComponent]
})
export class TeachingPlansDetailModule {}
