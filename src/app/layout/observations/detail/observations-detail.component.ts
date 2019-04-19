import { Component, OnInit, Input, TemplateRef, ViewChild } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { ActivatedRoute, Router } from '@angular/router';
import { Observation, ObservationService, DateUtils, ChildService, Child, OutcomeUtils, OutcomeType, Educator, EducatorService, Recommendation, RecommendationRequest, SessionUtils } from './../../../shared';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from 'ng2-bootstrap-modal';
import { ConfirmComponent } from 'src/app/shared/components/confirm.component';

@Component({
    selector: 'app-observations-detail',
    templateUrl: './observations-detail.component.html',
    styleUrls: ['./observations-detail.component.scss'],
    animations: [routerTransition()]
})
export class ObservationsDetailComponent implements OnInit {
    @Input() observation: Observation;
    outcomes: OutcomeType[];
    children: Child[];
    educator: Educator;
    recommendation: Recommendation;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private toastr: ToastrService,
        private dialogService: DialogService,
        private observationService: ObservationService,
        private educatorService: EducatorService,
        private childService: ChildService,
        public outcomeUtils: OutcomeUtils,
        private dateUtils: DateUtils,
        public sessionUtils: SessionUtils) {}

    ngOnInit() {this.route.params.subscribe(params => {
        this.outcomes = this.outcomeUtils.getOutcomes();
        this.childService.getChildren()
            .subscribe(children => this.children = children);

        if (params['id'] > 0) {
            this.observationService.getObservation(params['id'])
                .subscribe(observation => {
                    this.observation = observation;
                    this.educatorService.getEducator(this.observation.educator_id)
                        .subscribe(educator => this.educator = educator);
                });
        } else {
            this.educatorService.getEducator(this.sessionUtils.getId())
                .subscribe(educator => this.educator = educator);
            this.observation = new Observation();
        }
      });
    }

    back() {
        this.router.navigateByUrl('observations');
    }

    save() {
        this.observation.date_modified = this.dateUtils.getCurrentDateString();
        if (this.observation.id > 0) {
            this.update(false, 'Unable to save');
        } else {
            this.create();
        }
    }

    create() {
        this.observation.educator_id = this.educator.id;
        this.observation.date_created = this.dateUtils.getCurrentDateString();
        this.observation.published = 0;
        this.observation.deleted = 0;
        this.observationService.createObservation(this.observation)
            .subscribe(
                observation => {
                    this.observation = observation;
                    this.postSaveActions();
                    this.toastr.success('', 'Success');
                },
                error => {
                    this.toastr.error(error.statusText, 'Unable to save');
                });
    }

    update(routeOnSuccess: boolean, failMessage: string): boolean {
        this.observationService.updateObservation(this.observation)
        .subscribe(
            observation => {
                this.observation = observation;
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
        if (!this.educator.last_observation_activity || this.observation.date_tracked > this.educator.last_observation_activity) {
            this.educator.last_observation_activity = this.observation.date_tracked;
            this.educatorService.updateEducator(this.educator)
                .subscribe(_ => {});
        }
        this.childService.getChild(this.observation.child_id)
            .subscribe(child => {
                if (child.last_observation_activity || this.observation.date_tracked > child.last_observation_activity) {
                    child.last_observation_activity = this.observation.date_tracked;
                    this.childService.updateChild(child)
                        .subscribe(_ => {});
                }
            });
    }

    publishUnpublish() {
        this.observation.date_modified = this.dateUtils.getCurrentDateString();
        this.observation.published = this.observation.published === 1 ? 0 : 1;
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
        this.observation.date_modified = this.dateUtils.getCurrentDateString();
        this.observation.deleted = 1;
        this.update(true, 'Unable to delete');
    }

    getRecommendation() {
        const request = {
            observation: this.observation.observation
        };
        this.observationService.getRecommendation(request)
            .subscribe(recommendation => this.recommendation = recommendation);
    }
}
