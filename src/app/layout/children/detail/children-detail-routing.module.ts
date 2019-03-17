import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChildrenDetailComponent } from './children-detail.component';

const routes: Routes = [
    {
        path: '', component: ChildrenDetailComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ChildrenDetailRoutingModule {
}
