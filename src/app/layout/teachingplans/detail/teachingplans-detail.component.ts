import { Component, OnInit, Input, TemplateRef, ViewChild } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { ActivatedRoute, Router } from '@angular/router';
import { TeachingPlan, TeachingPlanService, DateUtils, ChildService, Child, OutcomeUtils, OutcomeType, Educator, EducatorService } from './../../../shared';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from 'ng2-bootstrap-modal';
import { ConfirmComponent } from 'src/app/shared/components/confirm.component';

@Component({
    selector: 'app-teachingPlans-detail',
    templateUrl: './teachingPlans-detail.component.html',
    styleUrls: ['./teachingPlans-detail.component.scss'],
    animations: [routerTransition()]
})
export class TeachingPlansDetailComponent implements OnInit {
    @Input() teachingPlan: TeachingPlan;
    outcomes: OutcomeType[];
    children: Child[];
    educator: Educator;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private toastr: ToastrService,
        private dialogService: DialogService,
        private teachingPlanService: TeachingPlanService,
        private educatorService: EducatorService,
        private childService: ChildService,
        private outcomeUtils: OutcomeUtils,
        private dateUtils: DateUtils) {}

    ngOnInit() {this.route.params.subscribe(params => {
        this.outcomes = this.outcomeUtils.getOutcomes();
        this.childService.getChildren()
            .subscribe(children => this.children = children);

        if (params['id'] > 0) {
            this.teachingPlanService.getTeachingPlan(params['id'])
                .subscribe(teachingPlan => {
                    this.teachingPlan = teachingPlan;
                    this.educatorService.getEducator(this.teachingPlan.educator_id)
                        .subscribe(educator => this.educator = educator);
                });
        } else {
            // TO DO: Get educator id from session
            this.educatorService.getEducator(1)
                .subscribe(educator => this.educator = educator);
            this.teachingPlan = new TeachingPlan();
        }
      });
    }

    back() {
        this.router.navigateByUrl('teachingplans');
    }

    save() {
        this.teachingPlan.date_modified = this.dateUtils.getCurrentDateString();
        if (this.teachingPlan.id > 0) {
            this.update(false, 'Unable to save');
        } else {
            this.create();
        }
    }

    create() {
        this.teachingPlan.educator_id = this.educator.id;
        this.teachingPlan.date_created = this.dateUtils.getCurrentDateString();
        this.teachingPlan.done = 0;
        this.teachingPlan.deleted = 0;
        this.teachingPlanService.createTeachingPlan(this.teachingPlan)
            .subscribe(
                teachingPlan => {
                    this.teachingPlan = teachingPlan;
                    this.postSaveActions();
                    this.toastr.success('', 'Success');
                },
                error => {
                    this.toastr.error(error.statusText, 'Unable to save');
                });
    }

    update(routeOnSuccess: boolean, failMessage: string): boolean {
        this.teachingPlanService.updateTeachingPlan(this.teachingPlan)
        .subscribe(
            teachingPlan => {
                this.teachingPlan = teachingPlan;
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
        if (!this.educator.last_teachingplan_activity || this.teachingPlan.target_date > this.educator.last_teachingplan_activity) {
            this.educator.last_teachingplan_activity = this.teachingPlan.target_date;
            this.educatorService.updateEducator(this.educator)
                .subscribe(_ => {});
        }
        this.childService.getChild(this.teachingPlan.child_id)
            .subscribe(child => {
                if (!child.last_teachingplan_activity || this.teachingPlan.target_date > child.last_teachingplan_activity) {
                    child.last_teachingplan_activity = this.teachingPlan.target_date;
                    this.childService.updateChild(child)
                        .subscribe(_ => {});
                }
            });
    }

    doneUndone() {
        this.teachingPlan.date_modified = this.dateUtils.getCurrentDateString();
        this.teachingPlan.done = this.teachingPlan.done === 1 ? 0 : 1;
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
        this.teachingPlan.date_modified = this.dateUtils.getCurrentDateString();
        this.teachingPlan.deleted = 1;
        this.update(true, 'Unable to delete');
    }
}
