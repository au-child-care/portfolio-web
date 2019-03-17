import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ParentsGuardiansComponent } from './parents-guardians.component';

const routes: Routes = [
    {
        path: '',
        component: ParentsGuardiansComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ParentsGuardiansRoutingModule {}
