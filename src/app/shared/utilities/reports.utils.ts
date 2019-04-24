import { Injectable } from '@angular/core';
import { Report } from '../dtos';

@Injectable({ providedIn: 'root' })
export class ReportUtils {
    reports: Report[];

    constructor() {
        this.reports = [
            new Report(
                'CHILD-LIST',
                'Children List Report',
                'Shows the list of child records.',
                [ 'ROLE_EDUCATOR', 'ROLE_ADMIN', 'ROLE_PARENT_GUARDIAN' ],
                false,
                false),
            new Report(
                'CHILD-OBSERVATIONS',
                'Child Observations Report',
                'Shows all the observations made for the selected child.',
                [ 'ROLE_EDUCATOR', 'ROLE_ADMIN', 'ROLE_PARENT_GUARDIAN' ],
                true,
                false),
            new Report(
                'CHILD-MILESTONES',
                'Child Milestones Report',
                'Shows all the milestones made for the selected child.',
                [ 'ROLE_EDUCATOR', 'ROLE_ADMIN', 'ROLE_PARENT_GUARDIAN' ],
                true,
                false),
            new Report(
                'EDUCATOR-OBSERVATIONS',
                'Educator Observations Report',
                'Shows all the observations made by the selected educator.',
                [ 'ROLE_EDUCATOR', 'ROLE_ADMIN' ],
                false,
                true),
            new Report(
                'EDUCATOR-TEACHINGPLANS',
                'Educator Teaching Plans Report',
                'Shows all the teaching plans made by the selected educator.',
                [ 'ROLE_EDUCATOR', 'ROLE_ADMIN' ],
                false,
                true),
            new Report(
                'EDUCATOR-LIST',
                'Educator List Report',
                'Shows the list of educator accounts.',
                [ 'ROLE_ADMIN' ],
                false,
                false),
            new Report(
                'PARENTGUARDIAN-LIST',
                'Parents and Guardians List Report',
                'Shows the list of parents and guardians accounts.',
                [ 'ROLE_ADMIN' ],
                false,
                false),
            new Report(
                'ADMIN-LIST',
                'Administrators List Report',
                'Shows the list of parents and guardians accounts.',
                [ 'ROLE_ADMIN' ],
                false,
                false)
        ];
    }

    getReports(): Report[] {
        return this.reports;
    }

    getReportsByRole(role: string): Report[] {
        return this.reports.filter(r => r.roles.indexOf(role) > -1);
    }
}
