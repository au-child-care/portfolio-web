import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeachingPlansDetailComponent } from './teachingplans-detail.component';

const routes: Routes = [
    {
        path: '', component: TeachingPlansDetailComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TeachingPlansDetailRoutingModule {
}
