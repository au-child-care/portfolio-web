import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChildrenComponent } from './children.component';

const routes: Routes = [
    {
        path: '',
        component: ChildrenComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ChildrenRoutingModule {}
