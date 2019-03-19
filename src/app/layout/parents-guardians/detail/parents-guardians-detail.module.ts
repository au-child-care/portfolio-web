import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParentsGuardiansDetailRoutingModule } from './parents-guardians-detail-routing.module';
import { ParentsGuardiansDetailComponent } from './parents-guardians-detail.component';
import { PageHeaderModule, ChildSelectorModule } from '../../../shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ParentsGuardiansDetailRoutingModule,
        PageHeaderModule,
        ChildSelectorModule],
    declarations: [ParentsGuardiansDetailComponent]
})
export class ParentsGuardiansDetailModule {}
