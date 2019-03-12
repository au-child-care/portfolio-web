import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministratorsRoutingModule } from './administrators-routing.module';
import { AdministratorsComponent } from './administrators.component';
import { PageHeaderModule } from './../../shared';

@NgModule({
    imports: [CommonModule, AdministratorsRoutingModule, PageHeaderModule],
    declarations: [AdministratorsComponent]
})
export class AdministratorsModule {}
