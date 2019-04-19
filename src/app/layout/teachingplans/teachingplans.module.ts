import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeachingPlansRoutingModule } from './teachingplans-routing.module';
import { TeachingPlansComponent } from './teachingplans.component';
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
