import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ObservationsRoutingModule } from './observations-routing.module';
import { ObservationsComponent } from './observations.component';
import { PageHeaderModule, SharedPipesModule } from './../../shared';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ObservationsRoutingModule,
        PageHeaderModule,
        SharedPipesModule],
    declarations: [ObservationsComponent]
})
export class ObservationsModule {}
