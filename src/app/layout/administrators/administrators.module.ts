import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministratorsRoutingModule } from './administrators-routing.module';
import { AdministratorsComponent } from './administrators.component';
import { PageHeaderModule, SharedPipesModule } from './../../shared';

@NgModule({
    imports: [CommonModule, AdministratorsRoutingModule, PageHeaderModule, SharedPipesModule],
    declarations: [AdministratorsComponent]
})
export class AdministratorsModule {}
