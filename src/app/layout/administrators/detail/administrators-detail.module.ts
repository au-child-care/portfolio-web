import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministratorsDetailRoutingModule } from './administrators-detail-routing.module';
import { AdministratorsDetailComponent } from './administrators-detail.component';
import { PageHeaderModule } from '../../../shared';

@NgModule({
    imports: [CommonModule, AdministratorsDetailRoutingModule, PageHeaderModule],
    declarations: [AdministratorsDetailComponent]
})
export class AdministratorsDetailModule {}
