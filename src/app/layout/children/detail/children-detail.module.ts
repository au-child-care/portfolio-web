import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChildrenDetailRoutingModule } from './children-detail-routing.module';
import { ChildrenDetailComponent } from './children-detail.component';
import { PageHeaderModule } from '../../../shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ChildrenDetailRoutingModule,
        PageHeaderModule],
    declarations: [ChildrenDetailComponent]
})
export class ChildrenDetailModule {}
