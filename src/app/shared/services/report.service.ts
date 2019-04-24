import { Injectable } from '@angular/core';
import { ChildService } from './child.service';
import { Report, Child } from '../dtos';

import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import { DateUtils, SessionUtils, OutcomeUtils } from '../utilities';
import { ParentGuardianAssignmentService } from './parent-guardian-assignment.service';
import { ObservationService } from './observation.service';
import { EducatorService } from './educator.service';
import { MilestoneService } from './milestone.service';
import { TeachingPlanService } from './teachingplan.service';

@Injectable({ providedIn: 'root' })
export class ReportService {

    constructor(
        private childService: ChildService,
        private educatorService: EducatorService,
        private parentGuardianAssignmentService: ParentGuardianAssignmentService,
        private observationService: ObservationService,
        private milestoneService: MilestoneService,
        private teachingPlanService: TeachingPlanService,
        private dateUtils: DateUtils,
        private outcomeUtils: OutcomeUtils,
        private sessionUtils: SessionUtils) { }

    generateReport(report: Report): void {
        switch (report.code) {
            case 'CHILD-LIST':
                this.generateReportChildList(report);
                break;
            case 'CHILD-OBSERVATIONS':
                this.generateReportChildObservations(report);
                break;
            case 'CHILD-MILESTONES':
                this.generateReportChildMilestones(report);
                break;
            case 'CHILD-TEACHINGPLANS':
                this.generateReportChildTeachingPlans(report);
                break;
            case 'EDUCATOR-OBSERVATIONS':
                this.generateReportEducatorObservations(report);
                break;
        }
    }

    generateReportChildList(report: Report): void {
        if (this.sessionUtils.getRole() === 'ROLE_PARENT_GUARDIAN') {
          this.parentGuardianAssignmentService.getChildrenByParentGuardian(this.sessionUtils.getId())
            .subscribe(children => this.generateReportChildListProcess(report, children));
        } else {
          this.childService.getChildren()
          .subscribe(children => this.generateReportChildListProcess(report, children));
        }
    }

    generateReportChildListProcess(report: Report, children: Child[]): void {
        const columns = [
            {
                header: 'First name',
                dataKey: 'first_name'
            },
            {
                header: 'Last name',
                dataKey: 'last_name'
            },
            {
                header: 'Nickname',
                dataKey: 'nickname'
            },
            {
                header: 'Birthday',
                dataKey: 'birthday'
            },
            {
                header: 'Group',
                dataKey: 'group'
            }
        ];

        const doc = this.createPdfReportDoc(report.title, 'l');
        doc.autoTable(columns, children, {
            startY: 110
        });
        doc.save(`${report.filenamePrefix}-list-${this.dateUtils.getCurrentDateStringUnformatted()}.pdf`);
    }

    generateReportChildObservations(report: Report): void {
        this.educatorService.getEducators()
            .subscribe(educators => {
                    this.childService.getChild(report.selectedChildId)
                        .subscribe(child => {
                            this.observationService.getObservationsByChild(report.selectedChildId)
                                .subscribe(observations => {
                                    const childColumns = [
                                        {
                                            header: 'First name',
                                            dataKey: 'first_name'
                                        },
                                        {
                                            header: 'Last name',
                                            dataKey: 'last_name'
                                        },
                                        {
                                            header: 'Nickname',
                                            dataKey: 'nickname'
                                        },
                                        {
                                            header: 'Birthday',
                                            dataKey: 'birthday'
                                        },
                                        {
                                            header: 'Group',
                                            dataKey: 'group'
                                        }
                                    ];
                                    const observationColumns = [
                                        {
                                            header: 'Date Tracked',
                                            dataKey: 'date_tracked'
                                        },
                                        {
                                            header: 'By',
                                            dataKey: 'educator_id'
                                        },
                                        {
                                            header: 'Observation',
                                            dataKey: 'observation'
                                        },
                                        {
                                            header: 'Outcome',
                                            dataKey: 'outcome_id'
                                        },
                                        {
                                            header: 'Assessment',
                                            dataKey: 'assessment'
                                        }
                                    ];

                                    const doc = this.createPdfReportDoc(report.title, 'l');
                                    doc.autoTable(childColumns, [ child ], {
                                        startY: 110
                                    });
                                    doc.autoTable(observationColumns, observations, {
                                        startY: 180,
                                        didParseCell: (HookData) => {
                                            if (HookData.section === 'body' && HookData.column.dataKey === 'educator_id') {
                                                const educator = educators.find(e => e.id === +HookData.cell.text);
                                                if (educator) {
                                                    HookData.cell.text = educator.first_name.charAt(0) + '. ' + educator.last_name;
                                                }
                                            }
                                            if (HookData.section === 'body' && HookData.column.dataKey === 'outcome_id') {
                                                HookData.cell.text = this.outcomeUtils.getOutcomeDescription(+HookData.cell.text);
                                            }
                                        },
                                        columnStyles: {
                                            date_tracked: {
                                                cellWidth: 60
                                            },
                                            educator_id: {
                                                cellWidth: 70
                                            },
                                            outcome_id: {
                                                cellWidth: 120
                                            }
                                        }
                                    });
                                    doc.save(`${report.filenamePrefix}-${child.last_name}-${this.dateUtils.getCurrentDateStringUnformatted()}.pdf`);
                                });
                        });
                    });
    }

    generateReportChildMilestones(report: Report): void {
        this.educatorService.getEducators()
            .subscribe(educators => {
                    this.childService.getChild(report.selectedChildId)
                        .subscribe(child => {
                            this.milestoneService.getByChild(report.selectedChildId)
                                .subscribe(milestones => {
                                    const childColumns = [
                                        {
                                            header: 'First name',
                                            dataKey: 'first_name'
                                        },
                                        {
                                            header: 'Last name',
                                            dataKey: 'last_name'
                                        },
                                        {
                                            header: 'Nickname',
                                            dataKey: 'nickname'
                                        },
                                        {
                                            header: 'Birthday',
                                            dataKey: 'birthday'
                                        },
                                        {
                                            header: 'Group',
                                            dataKey: 'group'
                                        }
                                    ];
                                    const observationColumns = [
                                        {
                                            header: 'Date Tracked',
                                            dataKey: 'date_tracked'
                                        },
                                        {
                                            header: 'By',
                                            dataKey: 'educator_id'
                                        },
                                        {
                                            header: 'Age group',
                                            dataKey: 'age_group'
                                        },
                                        {
                                            header: 'Area',
                                            dataKey: 'developmental_area'
                                        },
                                        {
                                            header: 'Observation',
                                            dataKey: 'observation'
                                        }
                                    ];

                                    const doc = this.createPdfReportDoc(report.title, 'l');
                                    doc.autoTable(childColumns, [ child ], {
                                        startY: 110
                                    });
                                    doc.autoTable(observationColumns, milestones, {
                                        startY: 180,
                                        didParseCell: (HookData) => {
                                            if (HookData.section === 'body' && HookData.column.dataKey === 'educator_id') {
                                                const educator = educators.find(e => e.id === +HookData.cell.text);
                                                if (educator) {
                                                    HookData.cell.text = educator.first_name.charAt(0) + '. ' + educator.last_name;
                                                }
                                            }
                                        },
                                        columnStyles: {
                                            date_tracked: {
                                                cellWidth: 60
                                            },
                                            educator_id: {
                                                cellWidth: 70
                                            },
                                            age_group: {
                                                cellWidth: 90
                                            },
                                            developmental_area: {
                                                cellWidth: 80
                                            }
                                        }
                                    });
                                    doc.save(`${report.filenamePrefix}-${child.last_name}-${this.dateUtils.getCurrentDateStringUnformatted()}.pdf`);
                                });
                        });
                    });
    }

    generateReportChildTeachingPlans(report: Report): void {
        this.educatorService.getEducators()
            .subscribe(educators => {
                    this.childService.getChild(report.selectedChildId)
                        .subscribe(child => {
                            this.teachingPlanService.getTeachingPlansByChild(report.selectedChildId)
                                .subscribe(teachingPlans => {
                                    const childColumns = [
                                        {
                                            header: 'First name',
                                            dataKey: 'first_name'
                                        },
                                        {
                                            header: 'Last name',
                                            dataKey: 'last_name'
                                        },
                                        {
                                            header: 'Nickname',
                                            dataKey: 'nickname'
                                        },
                                        {
                                            header: 'Birthday',
                                            dataKey: 'birthday'
                                        },
                                        {
                                            header: 'Group',
                                            dataKey: 'group'
                                        }
                                    ];
                                    const observationColumns = [
                                        {
                                            header: 'Target Date',
                                            dataKey: 'target_date'
                                        },
                                        {
                                            header: 'Done',
                                            dataKey: 'done'
                                        },
                                        {
                                            header: 'By',
                                            dataKey: 'educator_id'
                                        },
                                        {
                                            header: 'Title',
                                            dataKey: 'title'
                                        },
                                        {
                                            header: 'Details',
                                            dataKey: 'details'
                                        }
                                    ];

                                    const doc = this.createPdfReportDoc(report.title, 'l');
                                    doc.autoTable(childColumns, [ child ], {
                                        startY: 110
                                    });
                                    doc.autoTable(observationColumns, teachingPlans, {
                                        startY: 180,
                                        didParseCell: (HookData) => {
                                            if (HookData.section === 'body' && HookData.column.dataKey === 'educator_id') {
                                                const educator = educators.find(e => e.id === +HookData.cell.text);
                                                if (educator) {
                                                    HookData.cell.text = educator.first_name.charAt(0) + '. ' + educator.last_name;
                                                }
                                            }
                                            if (HookData.section === 'body' && HookData.column.dataKey === 'done') {
                                                HookData.cell.text = +HookData.cell.text === 1 ? 'Yes' : 'No';
                                            }
                                        },
                                        columnStyles: {
                                            target_date: {
                                                cellWidth: 60
                                            },
                                            done: {
                                                cellWidth: 40
                                            },
                                            educator_id: {
                                                cellWidth: 70
                                            },
                                            title: {
                                                cellWidth: 170
                                            }
                                        }
                                    });
                                    doc.save(`${report.filenamePrefix}-${child.last_name}-${this.dateUtils.getCurrentDateStringUnformatted()}.pdf`);
                                });
                        });
                    });
    }

    generateReportEducatorObservations(report: Report): void {
        this.childService.getChildren()
            .subscribe(children => {
                    this.educatorService.getEducator(report.selectedEducatorId)
                        .subscribe(educator => {
                            this.observationService.getObservationsByEducator(report.selectedEducatorId)
                                .subscribe(observations => {
                                    const educatorColumns = [
                                        {
                                            header: 'First name',
                                            dataKey: 'first_name'
                                        },
                                        {
                                            header: 'Last name',
                                            dataKey: 'last_name'
                                        },
                                        {
                                            header: 'Nickname',
                                            dataKey: 'nickname'
                                        },
                                        {
                                            header: 'Email',
                                            dataKey: 'email'
                                        },
                                        {
                                            header: 'Contact No.',
                                            dataKey: 'contact_number'
                                        }
                                    ];
                                    const observationColumns = [
                                        {
                                            header: 'Date Tracked',
                                            dataKey: 'date_tracked'
                                        },
                                        {
                                            header: 'For',
                                            dataKey: 'child_id'
                                        },
                                        {
                                            header: 'Observation',
                                            dataKey: 'observation'
                                        },
                                        {
                                            header: 'Outcome',
                                            dataKey: 'outcome_id'
                                        },
                                        {
                                            header: 'Assessment',
                                            dataKey: 'assessment'
                                        }
                                    ];

                                    const doc = this.createPdfReportDoc(report.title, 'l');
                                    doc.autoTable(educatorColumns, [ educator ], {
                                        startY: 110
                                    });
                                    doc.autoTable(observationColumns, observations, {
                                        startY: 180,
                                        didParseCell: (HookData) => {
                                            if (HookData.section === 'body' && HookData.column.dataKey === 'child_id') {
                                                const child = children.find(e => e.id === +HookData.cell.text);
                                                if (educator) {
                                                    HookData.cell.text = child.first_name.charAt(0) + '. ' + child.last_name;
                                                }
                                            }
                                            if (HookData.section === 'body' && HookData.column.dataKey === 'outcome_id') {
                                                HookData.cell.text = this.outcomeUtils.getOutcomeDescription(+HookData.cell.text);
                                            }
                                        },
                                        columnStyles: {
                                            date_tracked: {
                                                cellWidth: 60
                                            },
                                            child_id: {
                                                cellWidth: 70
                                            },
                                            outcome_id: {
                                                cellWidth: 120
                                            }
                                        }
                                    });
                                    doc.save(`${report.filenamePrefix}-${educator.last_name}-${this.dateUtils.getCurrentDateStringUnformatted()}.pdf`);
                                });
                        });
                    });
    }

    createPdfReportDoc(title: string, orientation: string): jsPDF {
        const doc = new jsPDF(orientation, 'pt');
        const imgData = 'data:image/png;base64,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';
        doc.addImage(imgData, 'PNG', 40, 20, 143, 23);
        doc.text(title, 40, 70);
        doc.setFontSize(10);
        doc.text(this.dateUtils.getDateLongFormat(), 40, 90);
        return doc;
    }
}
