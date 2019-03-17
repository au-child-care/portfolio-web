import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EducatorsRoutingModule } from './educators-routing.module';
import { EducatorsComponent } from './educators.component';
import { PageHeaderModule, SharedPipesModule } from './../../shared';

@NgModule({
    imports: [CommonModule, EducatorsRoutingModule, PageHeaderModule, SharedPipesModule],
    declarations: [EducatorsComponent]
})
export class EducatorsModule {}
