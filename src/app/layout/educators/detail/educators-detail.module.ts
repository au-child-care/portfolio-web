import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EducatorsDetailRoutingModule } from './educators-detail-routing.module';
import { EducatorsDetailComponent } from './educators-detail.component';
import { PageHeaderModule, ChildSelectorModule } from '../../../shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        EducatorsDetailRoutingModule,
        PageHeaderModule,
        ChildSelectorModule],
    declarations: [EducatorsDetailComponent]
})
export class EducatorsDetailModule {}
