import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ObservationsRoutingModule } from './observations-routing.module';
import { ObservationsComponent } from './observations.component';
import { PageHeaderModule, SharedPipesModule } from './../../shared';

@NgModule({
    imports: [CommonModule, ObservationsRoutingModule, PageHeaderModule, SharedPipesModule],
    declarations: [ObservationsComponent]
})
export class ObservationsModule {}
