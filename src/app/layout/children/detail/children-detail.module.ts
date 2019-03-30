import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChildrenDetailRoutingModule } from './children-detail-routing.module';
import { ChildrenDetailComponent } from './children-detail.component';
import { PageHeaderModule } from '../../../shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ChildrenDetailRoutingModule,
        PageHeaderModule,
        ChartsModule,
        NgbModule],
    declarations: [ChildrenDetailComponent]
})
export class ChildrenDetailModule {}
