import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EducatorsComponent } from './educators.component';

const routes: Routes = [
    {
        path: '',
        component: EducatorsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EducatorsRoutingModule {}
