import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CentreComponent } from './centre.component';

const routes: Routes = [
    {
        path: '', component: CentreComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CentreRoutingModule {
}
