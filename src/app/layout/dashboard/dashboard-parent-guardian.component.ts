import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Child, ParentGuardianAssignmentService, StatisticsChild, StatisticsService, SessionUtils } from 'src/app/shared';
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
        private parentGuardianAssignmentService: ParentGuardianAssignmentService,
        public sessionUtils: SessionUtils) {
    }

    ngOnInit() {
        this.parentGuardianAssignmentService.getChildrenByParentGuardian(this.sessionUtils.getId())
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
        if (this.childrenStatistics) {
            const stat = this.childrenStatistics.find(c => c.child_id === child_id);
            if (stat) {
                return stat[property] || 0;
            } else {
                return 0;
            }
        } else {
            return 0;
        }
    }

    onClickViewDetails(detailsUrl: string): void {
        this.router.navigateByUrl(detailsUrl);
    }
}
