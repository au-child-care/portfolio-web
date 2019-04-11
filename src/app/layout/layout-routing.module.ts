import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: 'charts', loadChildren: './charts/charts.module#ChartsModule' },
            { path: 'tables', loadChildren: './tables/tables.module#TablesModule' },
            { path: 'forms', loadChildren: './form/form.module#FormModule' },
            { path: 'bs-element', loadChildren: './bs-element/bs-element.module#BsElementModule' },
            { path: 'grid', loadChildren: './grid/grid.module#GridModule' },
            { path: 'components', loadChildren: './bs-component/bs-component.module#BsComponentModule' },
            { path: 'blank-page', loadChildren: './blank-page/blank-page.module#BlankPageModule' },

            { path: 'dashboard-admin', loadChildren: './dashboard/dashboard-admin.module#DashboardAdminModule' },
            { path: 'dashboard-educator', loadChildren: './dashboard/dashboard-educator.module#DashboardEducatorModule' },
            { path: 'dashboard-parent-guardian', loadChildren: './dashboard/dashboard-parent-guardian.module#DashboardParentGuardianModule' },

            { path: 'administrators', loadChildren: './administrators/administrators.module#AdministratorsModule' },
            { path: 'administrators/detail/:id', loadChildren: './administrators/detail/administrators-detail.module#AdministratorsDetailModule' },
            { path: 'children', loadChildren: './children/children.module#ChildrenModule' },
            { path: 'children/detail/:id', loadChildren: './children/detail/children-detail.module#ChildrenDetailModule' },
            { path: 'children', loadChildren: './children/children.module#ChildrenModule' },
            { path: 'observations', loadChildren: './observations/observations.module#ObservationsModule' },
            { path: 'observations/detail/:id', loadChildren: './observations/detail/observations-detail.module#ObservationsDetailModule' },
            { path: 'milestones', loadChildren: './milestones/milestones.module#MilestonesModule' },
            { path: 'milestones/detail/:id', loadChildren: './milestones/detail/milestones-detail.module#MilestonesDetailModule' },
            { path: 'teachingplans', loadChildren: './teachingplans/teachingplans.module#TeachingPlansModule' },
            { path: 'teachingplans/detail/:id', loadChildren: './teachingplans/detail/teachingplans-detail.module#TeachingPlansDetailModule' },
            { path: 'educators', loadChildren: './educators/educators.module#EducatorsModule' },
            { path: 'educators/detail/:id', loadChildren: './educators/detail/educators-detail.module#EducatorsDetailModule' },
            { path: 'parents-guardians', loadChildren: './parents-guardians/parents-guardians.module#ParentsGuardiansModule' },
            { path: 'parents-guardians/detail/:id', loadChildren: './parents-guardians/detail/parents-guardians-detail.module#ParentsGuardiansDetailModule' },
            { path: 'notifications', loadChildren: './notifications/notifications.module#NotificationsModule' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
