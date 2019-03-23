import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MilestonesDetailComponent } from './milestones-detail.component';

const routes: Routes = [
    {
        path: '', component: MilestonesDetailComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MilestonesDetailRoutingModule {
}
