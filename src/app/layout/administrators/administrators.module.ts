import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministratorsRoutingModule } from './administrators-routing.module';
import { AdministratorsComponent } from './administrators.component';

@NgModule({
    imports: [CommonModule, AdministratorsRoutingModule],
    declarations: [AdministratorsComponent]
})
export class AdministratorsModule {}
