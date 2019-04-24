import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './reports.component';
import { PageHeaderModule, SharedPipesModule } from './../../shared';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
    imports: [CommonModule, FormsModule, ReportsRoutingModule, PageHeaderModule, ReactiveFormsModule, SharedPipesModule],
    declarations: [ReportsComponent]
})
export class ReportsModule {}
