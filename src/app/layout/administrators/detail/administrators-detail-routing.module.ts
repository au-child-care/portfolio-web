import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdministratorsDetailComponent } from './administrators-detail.component';

const routes: Routes = [
    {
        path: '', component: AdministratorsDetailComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdministratorsDetailRoutingModule {
}
