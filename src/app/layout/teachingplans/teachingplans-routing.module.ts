import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeachingPlansComponent } from './teachingPlans.component';

const routes: Routes = [
    {
        path: '',
        component: TeachingPlansComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TeachingPlansRoutingModule {}
