import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardParentGuardianComponent } from './dashboard-parent-guardian.component';

const routes: Routes = [
    {
        path: '', component: DashboardParentGuardianComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardParentGuardianRoutingModule {
}
