import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MilestonesRoutingModule } from './milestones-routing.module';
import { MilestonesComponent } from './milestones.component';
import { PageHeaderModule, SharedPipesModule } from './../../shared';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MilestonesRoutingModule,
        PageHeaderModule,
        SharedPipesModule],
    declarations: [MilestonesComponent]
})
export class MilestonesModule {}
