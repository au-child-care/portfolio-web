import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChildrenRoutingModule } from './children-routing.module';
import { ChildrenComponent } from './children.component';
import { PageHeaderModule, SharedPipesModule } from './../../shared';

@NgModule({
    imports: [CommonModule, ChildrenRoutingModule, PageHeaderModule, SharedPipesModule],
    declarations: [ChildrenComponent]
})
export class ChildrenModule {}
