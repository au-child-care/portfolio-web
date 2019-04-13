import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChildrenRoutingModule } from './children-routing.module';
import { ChildrenComponent } from './children.component';
import { PageHeaderModule, SharedPipesModule } from './../../shared';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ChildrenRoutingModule,
        PageHeaderModule,
        SharedPipesModule
    ],
    declarations: [ChildrenComponent]
})
export class ChildrenModule {}
