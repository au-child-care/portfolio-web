import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParentsGuardiansRoutingModule } from './parents-guardians-routing.module';
import { ParentsGuardiansComponent } from './parents-guardians.component';
import { PageHeaderModule, SharedPipesModule } from './../../shared';

@NgModule({
    imports: [CommonModule, ParentsGuardiansRoutingModule, PageHeaderModule, SharedPipesModule],
    declarations: [ParentsGuardiansComponent]
})
export class ParentsGuardiansModule {}
