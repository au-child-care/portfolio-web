import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ObservationsDetailComponent } from './observations-detail.component';

const routes: Routes = [
    {
        path: '', component: ObservationsDetailComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ObservationsDetailRoutingModule {
}
