import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Label, MultiDataSet } from 'ng2-charts';
import { ChartType, ChartOptions, ChartDataSets } from 'chart.js';
import { StatisticsService, EducatorAssignmentService, StatisticsEducator, Child, OutcomeUtils, StatisticsChildConsolidated, SessionUtils } from 'src/app/shared';
import { Router } from '@angular/router';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard-educator.component.html',
    styleUrls: ['./dashboard-educator.component.scss'],
    animations: [routerTransition()]
})
export class DashboardEducatorComponent implements OnInit {
    childrenChartLabels: Label[] = ['Babies', 'Senior Babies', 'Toddlers', 'Juniors', 'Kinders'];
    childrenChartData: MultiDataSet;
    childrenChartType: ChartType = 'doughnut';

    observationsChartOptions: any;
    observationsChartLabels: Label[];
    observationsChartData: ChartDataSets[];
    observationsChartType: ChartType = 'radar';

    statistics: StatisticsEducator;
    children: Child[];
    consolidatedStatistics: StatisticsChildConsolidated;

    constructor(
        private router: Router,
        private statisticsService: StatisticsService,
        private educatorAssignmentService: EducatorAssignmentService,
        private outcomeUtils: OutcomeUtils,
        private sessionUtils: SessionUtils) {
    }

    ngOnInit() {
        const id = this.sessionUtils.getId();

        this.statisticsService.getForEducator(id)
            .subscribe(stats => {
                this.statistics = stats;
                this.educatorAssignmentService.getChildrenByEducator(id)
                    .subscribe(children => {
                        this.children = children;
                        this.initializeStatistics();
                });
            });
        this.statisticsService.getChildrenByEducator(id)
            .subscribe(stats => this.consolidatedStatistics = stats);
    }

    initializeStatistics() {
        this.childrenChartData = [[
            this.children.filter(c => c.group === 'Babies').length,
            this.children.filter(c => c.group === 'Senior Babies').length,
            this.children.filter(c => c.group === 'Toddlers').length,
            this.children.filter(c => c.group === 'Juniors').length,
            this.children.filter(c => c.group === 'Kinders').length
        ]];

        this.observationsChartLabels = this.outcomeUtils.getOutcomes().map(o => o.short_description);
        this.observationsChartOptions = {
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
        this.observationsChartData =  [{
            data: [
                this.statistics.total_observations_outcome1,
                this.statistics.total_observations_outcome2,
                this.statistics.total_observations_outcome3,
                this.statistics.total_observations_outcome4,
                this.statistics.total_observations_outcome5
            ],
            label: 'Observations'
        }];
    }

    onClickViewDetails(detailsUrl: string): void {
        this.router.navigateByUrl(detailsUrl);
    }
}
