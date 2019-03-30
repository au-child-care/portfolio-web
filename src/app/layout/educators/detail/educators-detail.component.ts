import { Component, OnInit, Input, TemplateRef, ViewChild } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { ActivatedRoute, Router } from '@angular/router';
import { Educator, EducatorService, DateUtils, EducatorAssignment, EducatorAssignmentService, ChildSelection, StatisticsService, StatisticsEducator } from 'src/app/shared';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from 'ng2-bootstrap-modal';
import { ConfirmComponent } from 'src/app/shared/components/confirm.component';
import { ChildSelectorComponent } from 'src/app/shared/modules/child-selector/child-selector.component';

@Component({
    selector: 'app-educators-detail',
    templateUrl: './educators-detail.component.html',
    styleUrls: ['./educators-detail.component.scss'],
    animations: [routerTransition()]
})
export class EducatorsDetailComponent implements OnInit {
    @ViewChild(ChildSelectorComponent) childSelectorComponent;
    @Input() educator: Educator;
    assignedChildIds: number[];
    statistics: StatisticsEducator;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private toastr: ToastrService,
        private dialogService: DialogService,
        private educatorService: EducatorService,
        private educatorAssignmentService: EducatorAssignmentService,
        private statisticsService: StatisticsService,
        private dateUtils: DateUtils) {}

    ngOnInit() {this.route.params.subscribe(params => {
        this.assignedChildIds = [];
        if (params['id'] > 0) {
            this.educatorService.getEducator(params['id'])
                .subscribe(educator => {
                    this.educator = educator;
                    this.educatorAssignmentService.getByEducator(educator.id)
                        .subscribe(assignment => {
                            this.assignedChildIds = assignment.map(a => a.child_id);
                        });
                    this.statisticsService.getForEducator(educator.id)
                        .subscribe(stats => this.statistics = stats);
                });
        } else {
            this.educator = new Educator();
        }
      });
    }

    back() {
        this.router.navigateByUrl('educators');
    }

    save() {
        this.educator.date_modified = this.dateUtils.getCurrentDateString();
        if (this.educator.id > 0) {
            this.update(false, true, 'Unable to save');
        } else {
            this.create();
        }
    }

    create() {
        this.educator.date_created = this.dateUtils.getCurrentDateString();
        this.educator.active = 0;
        this.educator.deleted = 0;
        this.educator.last_observation_activity = null;
        this.educator.last_milestone_activity = null;
        this.educator.last_teachingplan_activity = null;
        this.educatorService.createEducator(this.educator)
            .subscribe(
                educator => {
                    this.educator = educator;
                    this.setChildAssignment('Unable to save');
                },
                error => {
                    this.toastr.error(error.statusText, 'Unable to save');
                });
    }

    update(routeOnSuccess: boolean, saveAssignments: boolean, failMessage: string): boolean {
        this.educatorService.updateEducator(this.educator)
        .subscribe(
            educator => {
                this.educator = educator;
                if (saveAssignments) {
                    this.setChildAssignment(failMessage);
                } else {
                    this.toastr.success('', 'Success');
                }

                if (routeOnSuccess) {
                    this.back();
                }

                return true;
            },
            error => {
                this.toastr.error(error.statusText, failMessage);
            });
        return false;
    }

    setChildAssignment(failMessage: string) {
        this.assignedChildIds = this.childSelectorComponent.children.filter(ch => ch.selected).map(c => c.id);
        this.educatorAssignmentService.setByEducator(
            this.educator.id,
            this.assignedChildIds.map(cid => Object.assign(new EducatorAssignment(), {
                    educator_id: this.educator.id,
                    child_id: cid
                })))
            .subscribe(success => {
                this.toastr.success('', 'Success');
            },
            error => {
                this.toastr.error(error.statusText, failMessage);
            });
    }

    activateDeactivate() {
        this.educator.date_modified = this.dateUtils.getCurrentDateString();
        this.educator.active = this.educator.active === 1 ? 0 : 1;
        this.update(false, false, 'Unable to update status');
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
        this.educator.date_modified = this.dateUtils.getCurrentDateString();
        this.educator.deleted = 1;
        this.educatorAssignmentService.deleteByEducator(this.educator.id)
            .subscribe(
                success => this.update(true, false, 'Unable to delete'),
                error => {
                    this.toastr.error(error.statusText, 'Unable to delete');
                });
    }
}
