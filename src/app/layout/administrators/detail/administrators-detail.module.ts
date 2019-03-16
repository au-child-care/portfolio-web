import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministratorsDetailRoutingModule } from './administrators-detail-routing.module';
import { AdministratorsDetailComponent } from './administrators-detail.component';
import { PageHeaderModule } from '../../../shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AdministratorsDetailRoutingModule,
        PageHeaderModule],
    declarations: [AdministratorsDetailComponent]
})
export class AdministratorsDetailModule {}
