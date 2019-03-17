import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EducatorsDetailComponent } from './educators-detail.component';

const routes: Routes = [
    {
        path: '', component: EducatorsDetailComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EducatorsDetailRoutingModule {
}
