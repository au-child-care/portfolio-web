import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { ActivatedRoute, Router } from '@angular/router';
import { Child, ChildService, DateUtils, ParentGuardianAssignmentService, EducatorAssignmentService, ParentGuardian, Educator, StatisticsChild, OutcomeType, OutcomeUtils, StatisticsService, MilestoneUtils } from 'src/app/shared';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from 'ng2-bootstrap-modal';
import { ConfirmComponent } from 'src/app/shared/components/confirm.component';
import { ChartOptions, ChartDataSets, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
    selector: 'app-children-detail',
    templateUrl: './children-detail.component.html',
    styleUrls: ['./children-detail.component.scss'],
    animations: [routerTransition()]
})
export class ChildrenDetailComponent implements OnInit {
    @Input() child: Child;
    assignedParentsGuardians: ParentGuardian[];
    assignedEducators: Educator[];
    statistics: StatisticsChild;

    radarChartOptions: any;
    radarChartLabels: Label[];
    radarChartData: ChartDataSets[];
    radarChartType: ChartType = 'radar';

    barChartOptions: ChartOptions;
    barChartLabels: Label[];
    barChartLegend = true;
    barChartPlugins = [];
    barChartData: ChartDataSets[];
    barChartType: ChartType = 'bar';

    chartColors: any[];

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private toastr: ToastrService,
        private dialogService: DialogService,
        private childService: ChildService,
        private parentGuardianAssignmentService: ParentGuardianAssignmentService,
        private educatorAssignmentService: EducatorAssignmentService,
        private statisticsService: StatisticsService,
        private dateUtils: DateUtils,
        private outcomeUtils: OutcomeUtils,
        private milestoneUtils: MilestoneUtils) {}

    ngOnInit() {this.route.params.subscribe(params => {
        this.assignedParentsGuardians = [];
        this.assignedEducators = [];
        if (params['id'] > 0) {
            this.childService.getChild(params['id'])
                .subscribe(child => {
                    this.child = child;
                    this.educatorAssignmentService.getEducatorsByChild(this.child.id)
                        .subscribe(educators => this.assignedEducators = educators);
                    this.parentGuardianAssignmentService.getParentsGuardiansByChild(this.child.id)
                        .subscribe(parentsGuardians => this.assignedParentsGuardians = parentsGuardians);
                    this.initializeStatistics();
                });
        } else {
            this.child = new Child();
        }
      });
    }

    initializeStatistics() {
        this.statisticsService.getForChild(this.child.id)
            .subscribe(stats => {
                this.statistics = stats;
                this.radarChartData =  [{
                    data: [
                        this.statistics.total_observations_outcome1,
                        this.statistics.total_observations_outcome2,
                        this.statistics.total_observations_outcome3,
                        this.statistics.total_observations_outcome4,
                        this.statistics.total_observations_outcome5
                    ],
                    label: 'Observations'
                }];
                this.barChartData = [{
                    data: [
                        this.statistics.total_milestones_physical,
                        this.statistics.total_milestones_social,
                        this.statistics.total_milestones_emotional,
                        this.statistics.total_milestones_cognitive,
                        this.statistics.total_milestones_language
                    ],
                    label: 'Milestones'
                }];
            });

        this.radarChartLabels = this.outcomeUtils.getOutcomes().map(o => o.short_description);
        this.radarChartOptions = {
            responsive: true,
            maintainAspectRatio: true,
            legend: {
                display: false
            },
            scale: {
                ticks: {
                    beginAtZero: true
                }
            }
        };

        this.barChartLabels = this.milestoneUtils.getDevelopmentalAreas();
        this.barChartOptions = {
            responsive: true,
            legend: {
                display: false
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        };

        this.chartColors = [
            {
                backgroundColor: 'rgba(25, 25, 255, 0.3)'
            }
        ];
    }

    back() {
        this.router.navigateByUrl('children');
    }

    save() {
        this.child.date_modified = this.dateUtils.getCurrentDateString();
        if (this.child.id > 0) {
            this.update(false, 'Unable to save');
        } else {
            this.child.date_created = this.dateUtils.getCurrentDateString();
            this.child.active = 0;
            this.child.deleted = 0;
            this.child.last_observation_activity = null;
            this.child.last_milestone_activity = null;
            this.child.last_teachingplan_activity = null;
            this.childService.createChild(this.child)
                .subscribe(
                    child => {
                        this.child = child;
                        this.toastr.success('', 'Success');
                        this.initializeStatistics();
                    },
                    error => {
                        this.toastr.error(error.statusText, 'Unable to save');
                    });
        }
    }

    update(routeOnSuccess: boolean, failMessage: string) {
        this.childService.updateChild(this.child)
        .subscribe(
            child => {
                this.child = child;
                this.toastr.success('', 'Success');
                if (routeOnSuccess) {
                    this.back();
                }
            },
            error => {
                this.toastr.error(error.statusText, failMessage);
            });
    }

    activateDeactivate() {
        this.child.date_modified = this.dateUtils.getCurrentDateString();
        this.child.active = this.child.active === 1 ? 0 : 1;
        this.update(false, 'Unable to update status');
    }

    showConfirm(template: TemplateRef<any>) {
        this.dialogService.addDialog(
            ConfirmComponent,
            {
                title: 'Confirm deletion',
                message: 'Are you sure you want to proceed?'
            })
                .subscribe((isConfirmed) => {
                    if (isConfirmed) {
                        this.delete();
                    }
                });
    }

    delete() {
        this.child.date_modified = this.dateUtils.getCurrentDateString();
        this.child.deleted = 1;
        this.educatorAssignmentService.deleteByChild(this.child.id)
            .subscribe(success => {
                this.parentGuardianAssignmentService.deleteByChild(this.child.id)
                    .subscribe(success2 => {
                        this.update(true, 'Unable to delete');
                    },
                    error2 => {
                        this.toastr.error(error2.statusText, 'Unable to delete');
                    });
            },
            error => {
                this.toastr.error(error.statusText, 'Unable to delete');
            });
    }
}
