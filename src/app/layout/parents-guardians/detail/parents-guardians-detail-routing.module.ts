import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ParentsGuardiansDetailComponent } from './parents-guardians-detail.component';

const routes: Routes = [
    {
        path: '', component: ParentsGuardiansDetailComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ParentsGuardiansDetailRoutingModule {
}
