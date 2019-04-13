import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeachingPlansRoutingModule } from './teachingPlans-routing.module';
import { TeachingPlansComponent } from './teachingPlans.component';
import { PageHeaderModule, SharedPipesModule } from './../../shared';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        TeachingPlansRoutingModule,
        PageHeaderModule,
        SharedPipesModule],
    declarations: [TeachingPlansComponent]
})
export class TeachingPlansModule {}
