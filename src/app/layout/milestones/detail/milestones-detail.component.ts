import { Component, OnInit, Input, TemplateRef, ViewChild } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { ActivatedRoute, Router } from '@angular/router';
import { Milestone, MilestoneService, DateUtils, ChildService, Child, OutcomeUtils, OutcomeType, Educator, EducatorService, MilestoneObservation, MilestoneUtils } from './../../../shared';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from 'ng2-bootstrap-modal';
import { ConfirmComponent } from 'src/app/shared/components/confirm.component';

@Component({
    selector: 'app-milestones-detail',
    templateUrl: './milestones-detail.component.html',
    styleUrls: ['./milestones-detail.component.scss'],
    animations: [routerTransition()]
})
export class MilestonesDetailComponent implements OnInit {
    @Input() milestone: Milestone;
    outcomes: OutcomeType[];
    children: Child[];
    educator: Educator;
    milestoneObservations: MilestoneObservation[];

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private toastr: ToastrService,
        private dialogService: DialogService,
        private milestoneService: MilestoneService,
        private milestoneUtils: MilestoneUtils,
        private educatorService: EducatorService,
        private childService: ChildService,
        private outcomeUtils: OutcomeUtils,
        private dateUtils: DateUtils) {}

    ngOnInit() {this.route.params.subscribe(params => {
        this.outcomes = this.outcomeUtils.getOutcomes();
        this.childService.getChildren()
            .subscribe(children => this.children = children);

        if (params['id'] > 0) {
            this.milestoneService.getMilestone(params['id'])
                .subscribe(milestone => {
                    this.milestone = milestone;
                    this.educatorService.getEducator(this.milestone.educator_id)
                        .subscribe(educator => this.educator = educator);
                    this.updateObservations();
                });
        } else {
            // TO DO: Get educator id from session
            this.educatorService.getEducator(1)
                .subscribe(educator => this.educator = educator);
            this.milestone = new Milestone();
        }
      });
    }

    updateObservations() {
        this.milestoneObservations = this.milestoneUtils.getObservationsByAgeAndArea(this.milestone.age_group, this.milestone.developmental_area);
    }

    back() {
        this.router.navigateByUrl('milestones');
    }

    save() {
        this.milestone.date_modified = this.dateUtils.getCurrentDateString();
        if (this.milestone.id > 0) {
            this.update(false, 'Unable to save');
        } else {
            this.create();
        }
    }

    create() {
        this.milestone.educator_id = this.educator.id;
        this.milestone.date_created = this.dateUtils.getCurrentDateString();
        this.milestone.published = 0;
        this.milestone.deleted = 0;
        this.milestoneService.createMilestone(this.milestone)
            .subscribe(
                milestone => {
                    this.milestone = milestone;
                    this.postSaveActions();
                    this.toastr.success('', 'Success');
                },
                error => {
                    this.toastr.error(error.statusText, 'Unable to save');
                });
    }

    update(routeOnSuccess: boolean, failMessage: string): boolean {
        this.milestoneService.updateMilestone(this.milestone)
        .subscribe(
            milestone => {
                this.milestone = milestone;
                this.postSaveActions();
                this.toastr.success('', 'Success');

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

    postSaveActions() {
        this.educator.last_activity = this.dateUtils.getCurrentDateString();
        this.educatorService.updateEducator(this.educator)
            .subscribe(_ => {});
        this.childService.getChild(this.milestone.child_id)
            .subscribe(child => {
                child.last_activity = this.dateUtils.getCurrentDateString();
                this.childService.updateChild(child)
                    .subscribe(_ => {});
            });
    }

    publishUnpublish() {
        this.milestone.date_modified = this.dateUtils.getCurrentDateString();
        this.milestone.published = this.milestone.published === 1 ? 0 : 1;
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
        this.milestone.date_modified = this.dateUtils.getCurrentDateString();
        this.milestone.deleted = 1;
        this.update(true, 'Unable to delete');
    }
}
