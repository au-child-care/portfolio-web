import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            // Dashboards
            { path: 'dashboard-admin', loadChildren: './dashboard/dashboard-admin.module#DashboardAdminModule' },
            { path: 'dashboard-educator', loadChildren: './dashboard/dashboard-educator.module#DashboardEducatorModule' },
            { path: 'dashboard-parent-guardian', loadChildren: './dashboard/dashboard-parent-guardian.module#DashboardParentGuardianModule' },
            // Notifications and own account management
            { path: 'notifications', loadChildren: './notifications/notifications.module#NotificationsModule' },
            { path: 'account', loadChildren: './account/account.module#AccountModule' },
            // Centre settings
            { path: 'centre', loadChildren: './centre/centre.module#CentreModule' },
            // Accounts management
            { path: 'administrators', loadChildren: './administrators/administrators.module#AdministratorsModule' },
            { path: 'administrators/detail/:id', loadChildren: './administrators/detail/administrators-detail.module#AdministratorsDetailModule' },
            { path: 'educators', loadChildren: './educators/educators.module#EducatorsModule' },
            { path: 'educators/detail/:id', loadChildren: './educators/detail/educators-detail.module#EducatorsDetailModule' },
            { path: 'parents-guardians', loadChildren: './parents-guardians/parents-guardians.module#ParentsGuardiansModule' },
            { path: 'parents-guardians/detail/:id', loadChildren: './parents-guardians/detail/parents-guardians-detail.module#ParentsGuardiansDetailModule' },
            // Portfolio management
            { path: 'children', loadChildren: './children/children.module#ChildrenModule' },
            { path: 'children/detail/:id', loadChildren: './children/detail/children-detail.module#ChildrenDetailModule' },
            { path: 'children', loadChildren: './children/children.module#ChildrenModule' },
            { path: 'observations', loadChildren: './observations/observations.module#ObservationsModule' },
            { path: 'observations/detail/:id', loadChildren: './observations/detail/observations-detail.module#ObservationsDetailModule' },
            { path: 'milestones', loadChildren: './milestones/milestones.module#MilestonesModule' },
            { path: 'milestones/detail/:id', loadChildren: './milestones/detail/milestones-detail.module#MilestonesDetailModule' },
            { path: 'teachingplans', loadChildren: './teachingplans/teachingplans.module#TeachingPlansModule' },
            { path: 'teachingplans/detail/:id', loadChildren: './teachingplans/detail/teachingplans-detail.module#TeachingPlansDetailModule' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
