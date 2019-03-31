import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardEducatorComponent } from './dashboard-educator.component';

const routes: Routes = [
    {
        path: '', component: DashboardEducatorComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardEducatorRoutingModule {
}
