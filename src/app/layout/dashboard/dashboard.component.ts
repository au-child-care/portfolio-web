import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Label, MultiDataSet } from 'ng2-charts';
import { ChartType } from 'chart.js';
import { StatisticsService, StatisticsAll } from 'src/app/shared';
import { Router } from '@angular/router';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [routerTransition()]
})
export class DashboardComponent implements OnInit {
    childrenChartLabels: Label[] = ['Babies', 'Senior Babies', 'Toddlers', 'Juniors', 'Kinders'];
    childrenChartData: MultiDataSet;
    childrenChartType: ChartType = 'doughnut';

    parentGuardianChartLabels: Label[] = ['Parents', 'Guardians'];
    parentGuardianChartData: MultiDataSet;
    parentGuardianChartType: ChartType = 'doughnut';

    statistics: StatisticsAll;

    constructor(
        private router: Router,
        private statisticsService: StatisticsService) {
    }

    ngOnInit() {
        this.statisticsService.getAll()
            .subscribe(stats => {
                this.statistics = stats;
                this.childrenChartData = [[
                    this.statistics.total_babies,
                    this.statistics.total_senior_babies,
                    this.statistics.total_toddlers,
                    this.statistics.total_juniors,
                    this.statistics.total_kinders]
                ];
                this.parentGuardianChartData = [[
                    this.statistics.total_parents,
                    this.statistics.total_guardians]
                ];
            });
    }

    onClickViewDetails(detailsUrl: string): void {
        this.router.navigateByUrl(detailsUrl);
    }
}
