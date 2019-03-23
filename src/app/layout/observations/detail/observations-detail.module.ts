import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ObservationsDetailRoutingModule } from './observations-detail-routing.module';
import { ObservationsDetailComponent } from './observations-detail.component';
import { PageHeaderModule } from '../../../shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ObservationsDetailRoutingModule,
        PageHeaderModule],
    declarations: [ObservationsDetailComponent]
})
export class ObservationsDetailModule {}
