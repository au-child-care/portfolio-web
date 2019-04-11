import { Component, OnInit, Input, TemplateRef, ViewChild } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { ActivatedRoute, Router } from '@angular/router';
import { Milestone, MilestoneService, DateUtils, ChildService, Child, OutcomeUtils, OutcomeType, Educator, EducatorService, MilestoneObservation, MilestoneUtils, SessionUtils } from './../../../shared';
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
    loaded: boolean;
    outcomes: OutcomeType[];
    educator: Educator;
    educators: Educator[];
    child: Child;
    milestones: Milestone[];
    milestonesObservations: MilestoneObservation[];
    milestonesBirthTo4mPhysical: MilestoneObservation[];
    milestonesBirthTo4mSocial: MilestoneObservation[];
    milestonesBirthTo4mEmotional: MilestoneObservation[];
    milestonesBirthTo4mCognitive: MilestoneObservation[];
    milestonesBirthTo4mLanguage: MilestoneObservation[];
    milestonesBirthTo4mSeekAdvice: MilestoneObservation[];
    milestones4To8mPhysical: MilestoneObservation[];
    milestones4To8mSocial: MilestoneObservation[];
    milestones4To8mEmotional: MilestoneObservation[];
    milestones4To8mCognitive: MilestoneObservation[];
    milestones4To8mLanguage: MilestoneObservation[];
    milestones4To8mSeekAdvice: MilestoneObservation[];
    milestones8To12mPhysical: MilestoneObservation[];
    milestones8To12mSocial: MilestoneObservation[];
    milestones8To12mEmotional: MilestoneObservation[];
    milestones8To12mCognitive: MilestoneObservation[];
    milestones8To12mLanguage: MilestoneObservation[];
    milestones8To12mSeekAdvice: MilestoneObservation[];
    milestones1to2yPhysical: MilestoneObservation[];
    milestones1to2ySocial: MilestoneObservation[];
    milestones1to2yEmotional: MilestoneObservation[];
    milestones1to2yCognitive: MilestoneObservation[];
    milestones1to2yLanguage: MilestoneObservation[];
    milestones1to2ySeekAdvice: MilestoneObservation[];
    milestones2to3yPhysical: MilestoneObservation[];
    milestones2to3ySocial: MilestoneObservation[];
    milestones2to3yEmotional: MilestoneObservation[];
    milestones2to3yCognitive: MilestoneObservation[];
    milestones2to3yLanguage: MilestoneObservation[];
    milestones2to3ySeekAdvice: MilestoneObservation[];
    milestones3to5yPhysical: MilestoneObservation[];
    milestones3to5ySocial: MilestoneObservation[];
    milestones3to5yEmotional: MilestoneObservation[];
    milestones3to5yCognitive: MilestoneObservation[];
    milestones3to5yLanguage: MilestoneObservation[];
    milestones3to5ySeekAdvice: MilestoneObservation[];

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
        private dateUtils: DateUtils,
        private sessionUtils: SessionUtils) {}

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.outcomes = this.outcomeUtils.getOutcomes();
            if (params['id'] > 0) {
                if (this.sessionUtils.getRole() === 'ROLE_EDUCATOR') {
                    this.educatorService.getEducator(this.sessionUtils.getId())
                        .subscribe(edcator => {
                            this.educator = edcator;
                            this.initMilestones(params['id']);
                        });
                } else {
                    this.initMilestones(params['id']);
                }
            }
        });
    }

    initMilestones(childId) {
        this.educatorService.getEducators()
            .subscribe(educators => {
                this.educators = educators;
                this.childService.getChild(childId)
                    .subscribe(child => {
                        this.child = child;
                        this.milestoneService.getByChild(childId)
                            .subscribe(milestones => {
                                this.milestones = milestones;
                                const observations = this.milestoneUtils.getObservations();
                                observations.forEach(o => {
                                        const tracked = this.milestones.find(m => m.age_group === o.age_group && m.developmental_area === o.developmental_area && m.observation === o.observation);
                                        const tracker = this.educators.find(m => m.id === (tracked ? tracked.educator_id : (this.educator ? this.educator.id : 0)));
                                        o.child_id = this.child.id;
                                        o.date_tracked = tracked ? tracked.date_tracked : '';
                                        o.outcome_id = tracked ? tracked.outcome_id : 0;
                                        o.educator_id = tracked ? tracked.educator_id : (this.educator ? this.educator.id : 0);
                                        o.educator_name = tracker ? tracker.first_name + ' ' + tracker.last_name : 'Unknown';
                                        o.selected = tracked ? 1 : 0;
                                    });
                                this.milestonesObservations = observations;
                                this.milestonesBirthTo4mPhysical = this.milestonesObservations.filter(m => m.age_group === 'Birth to 4 months' && m.developmental_area === 'Physical');
                                this.milestonesBirthTo4mSocial = this.milestonesObservations.filter(m => m.age_group === 'Birth to 4 months' && m.developmental_area === 'Social');
                                this.milestonesBirthTo4mEmotional = this.milestonesObservations.filter(m => m.age_group === 'Birth to 4 months' && m.developmental_area === 'Emotional');
                                this.milestonesBirthTo4mCognitive = this.milestonesObservations.filter(m => m.age_group === 'Birth to 4 months' && m.developmental_area === 'Cognitive');
                                this.milestonesBirthTo4mLanguage = this.milestonesObservations.filter(m => m.age_group === 'Birth to 4 months' && m.developmental_area === 'Language');
                                this.milestonesBirthTo4mSeekAdvice = this.milestonesObservations.filter(m => m.age_group === 'Birth to 4 months' && m.developmental_area === 'Seek advice');
                                this.milestones4To8mPhysical = this.milestonesObservations.filter(m => m.age_group === '4 to 8 months' && m.developmental_area === 'Physical');
                                this.milestones4To8mSocial = this.milestonesObservations.filter(m => m.age_group === '4 to 8 months' && m.developmental_area === 'Social');
                                this.milestones4To8mEmotional = this.milestonesObservations.filter(m => m.age_group === '4 to 8 months' && m.developmental_area === 'Emotional');
                                this.milestones4To8mCognitive = this.milestonesObservations.filter(m => m.age_group === '4 to 8 months' && m.developmental_area === 'Cognitive');
                                this.milestones4To8mLanguage = this.milestonesObservations.filter(m => m.age_group === '4 to 8 months' && m.developmental_area === 'Language');
                                this.milestones4To8mSeekAdvice = this.milestonesObservations.filter(m => m.age_group === '4 to 8 months' && m.developmental_area === 'Seek advice');
                                this.milestones8To12mPhysical = this.milestonesObservations.filter(m => m.age_group === '8 to 12 months' && m.developmental_area === 'Physical');
                                this.milestones8To12mSocial = this.milestonesObservations.filter(m => m.age_group === '8 to 12 months' && m.developmental_area === 'Social');
                                this.milestones8To12mEmotional = this.milestonesObservations.filter(m => m.age_group === '8 to 12 months' && m.developmental_area === 'Emotional');
                                this.milestones8To12mCognitive = this.milestonesObservations.filter(m => m.age_group === '8 to 12 months' && m.developmental_area === 'Cognitive');
                                this.milestones8To12mLanguage = this.milestonesObservations.filter(m => m.age_group === '8 to 12 months' && m.developmental_area === 'Language');
                                this.milestones8To12mSeekAdvice = this.milestonesObservations.filter(m => m.age_group === '8 to 12 months' && m.developmental_area === 'Seek advice');
                                this.milestones1to2yPhysical = this.milestonesObservations.filter(m => m.age_group === '1 to 2 years' && m.developmental_area === 'Physical');
                                this.milestones1to2ySocial = this.milestonesObservations.filter(m => m.age_group === '1 to 2 years' && m.developmental_area === 'Social');
                                this.milestones1to2yEmotional = this.milestonesObservations.filter(m => m.age_group === '1 to 2 years' && m.developmental_area === 'Emotional');
                                this.milestones1to2yCognitive = this.milestonesObservations.filter(m => m.age_group === '1 to 2 years' && m.developmental_area === 'Cognitive');
                                this.milestones1to2yLanguage = this.milestonesObservations.filter(m => m.age_group === '1 to 2 years' && m.developmental_area === 'Language');
                                this.milestones1to2ySeekAdvice = this.milestonesObservations.filter(m => m.age_group === '1 to 2 years' && m.developmental_area === 'Seek advice');
                                this.milestones2to3yPhysical = this.milestonesObservations.filter(m => m.age_group === '2 to 3 years' && m.developmental_area === 'Physical');
                                this.milestones2to3ySocial = this.milestonesObservations.filter(m => m.age_group === '2 to 3 years' && m.developmental_area === 'Social');
                                this.milestones2to3yEmotional = this.milestonesObservations.filter(m => m.age_group === '2 to 3 years' && m.developmental_area === 'Emotional');
                                this.milestones2to3yCognitive = this.milestonesObservations.filter(m => m.age_group === '2 to 3 years' && m.developmental_area === 'Cognitive');
                                this.milestones2to3yLanguage = this.milestonesObservations.filter(m => m.age_group === '2 to 3 years' && m.developmental_area === 'Language');
                                this.milestones2to3ySeekAdvice = this.milestonesObservations.filter(m => m.age_group === '2 to 3 years' && m.developmental_area === 'Seek advice');
                                this.milestones3to5yPhysical = this.milestonesObservations.filter(m => m.age_group === '3 to 5 years' && m.developmental_area === 'Physical');
                                this.milestones3to5ySocial = this.milestonesObservations.filter(m => m.age_group === '3 to 5 years' && m.developmental_area === 'Social');
                                this.milestones3to5yEmotional = this.milestonesObservations.filter(m => m.age_group === '3 to 5 years' && m.developmental_area === 'Emotional');
                                this.milestones3to5yCognitive = this.milestonesObservations.filter(m => m.age_group === '3 to 5 years' && m.developmental_area === 'Cognitive');
                                this.milestones3to5yLanguage = this.milestonesObservations.filter(m => m.age_group === '3 to 5 years' && m.developmental_area === 'Language');
                                this.milestones3to5ySeekAdvice = this.milestonesObservations.filter(m => m.age_group === '3 to 5 years' && m.developmental_area === 'Seek advice');
                                this.loaded = true;
                            });
                    });
            });
    }

    back() {
        this.router.navigateByUrl('milestones');
    }

    save() {
        const observations = this.milestonesObservations.filter(o => o.selected);
        if (this.validate(observations)) {
            this.milestoneService.setByChild(this.child.id, observations)
                .subscribe(success => {
                    this.postSaveActions(observations);
                    this.toastr.success('', 'Success');
                },
                error => {
                    this.toastr.error(error.statusText, 'Unable to save');
                });
        } else {
            this.toastr.error('Please provide the date and outcome for all the ticked (achieved) milestones', 'Unable to save');
        }
    }

    validate(observations: MilestoneObservation[]): boolean {
        return !observations.some(o => o.date_tracked === '') &&
            !observations.some(o => o.outcome_id < 1);
    }

    postSaveActions(observations: MilestoneObservation[]) {
        this.child.last_milestone_activity = observations.length > 0 ? observations.sort((a, b) => new Date(b.date_tracked).getTime() - new Date(a.date_tracked).getTime())[0].date_tracked : null;
        this.childService.updateChild(this.child)
            .subscribe(_ => {});
        const educatorLatestTracked = observations.filter(o => o.educator_id === this.educator.id).sort((a, b) => new Date(b.date_tracked).getTime() - new Date(a.date_tracked).getTime())[0];
        if (educatorLatestTracked && (!this.educator.last_milestone_activity || educatorLatestTracked.date_tracked > this.educator.last_milestone_activity)) {
            this.educator.last_milestone_activity = educatorLatestTracked.date_tracked;
            this.educatorService.updateEducator(this.educator)
                .subscribe(_ => {});
        }
    }
}
