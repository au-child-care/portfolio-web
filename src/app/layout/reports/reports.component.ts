import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Router } from '@angular/router';

import { Report, SessionUtils, ReportUtils, Educator, ParentGuardianAssignmentService, ChildService, EducatorService, Child, ReportService } from './../../shared';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
  animations: [routerTransition()]
})
export class ReportsComponent implements OnInit {
  reports: Report[];
  children: Child[];
  educators: Educator[];

  constructor(
    private router: Router,
    private childService: ChildService,
    private educatorService: EducatorService,
    private parentGuardianAssignmentService: ParentGuardianAssignmentService,
    private reportService: ReportService,
    private reportUtils: ReportUtils,
    public sessionUtils: SessionUtils
  ) {}

  ngOnInit() {
    this.getReports();
    this.getChildren();
    this.getEducators();
  }

  getReports(): void {
    this.reports = this.reportUtils.getReportsByRole(this.sessionUtils.getRole());
  }

  getChildren(): void {
    if (this.sessionUtils.getRole() === 'ROLE_PARENT_GUARDIAN') {
      this.parentGuardianAssignmentService.getChildrenByParentGuardian(this.sessionUtils.getId())
        .subscribe(children => this.children = children);
    } else {
      this.childService.getChildren()
        .subscribe(children => this.children = children);
    }
  }

  getEducators(): void {
    if (this.sessionUtils.getRole() !== 'ROLE_PARENT_GUARDIAN') {
      this.educatorService.getEducators()
        .subscribe(educators => this.educators = educators);
    } else {
      this.educators = [];
    }
  }

  generateReport(report: Report): void {
    this.reportService.generateReport(report);
  }
}
