import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Child, ParentGuardianAssignmentService, StatisticsChild, StatisticsService } from 'src/app/shared';
import { Router } from '@angular/router';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard-parent-guardian.component.html',
    styleUrls: ['./dashboard-parent-guardian.component.scss'],
    animations: [routerTransition()]
})
export class DashboardParentGuardianComponent implements OnInit {
    children: Child[];
    childrenStatistics: StatisticsChild[];

    constructor(
        private router: Router,
        private statisticsService: StatisticsService,
        private parentGuardianAssignmentService: ParentGuardianAssignmentService) {
    }

    ngOnInit() {
        // TO DO: get parent-guardian from session
        this.parentGuardianAssignmentService.getChildrenByParentGuardian(1)
            .subscribe(children => {
                this.childrenStatistics = [];
                children.forEach(child => {
                    this.statisticsService.getForChild(child.id)
                        .subscribe(stat => this.childrenStatistics.push(stat));
                });
                this.children = children;
            });
    }

    getStatisticsValue(child_id: number, property: string) {
        return this.childrenStatistics.find(c => c.child_id === child_id)[property] || 0;
    }

    onClickViewDetails(detailsUrl: string): void {
        this.router.navigateByUrl(detailsUrl);
    }
}
