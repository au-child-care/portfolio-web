import { Component, OnInit, Input } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Router } from '@angular/router';

import { ObservationView, ObservationService, ChildService, OutcomeUtils, EducatorService, EducatorUtils, ChildUtils, SessionUtils, EducatorAssignmentService, ParentGuardianAssignmentService, Educator, Child, Observation } from './../../shared';

@Component({
  selector: 'app-children',
  templateUrl: './observations.component.html',
  styleUrls: ['./observations.component.scss'],
  animations: [routerTransition()]
})
export class ObservationsComponent implements OnInit {
  observations: ObservationView[];
  educators: Educator[];
  children: Child[];
  @Input() filter_mode = this.sessionUtils.isAllowed('ROLE_ADMIN') ? 'All' : 'Mine';

  constructor(
    private router: Router,
    private observationService: ObservationService,
    private educatorService: EducatorService,
    private educatorUtils: EducatorUtils,
    private childService: ChildService,
    private childUtils: ChildUtils,
    private outcomeUtils: OutcomeUtils,
    public sessionUtils: SessionUtils,
    private educatorAssignmentService: EducatorAssignmentService,
    private parentGuardianService: ParentGuardianAssignmentService) { }

  ngOnInit() {
    this.educatorService.getEducators()
      .subscribe(educators => {
        this.educators = educators;
        this.childService.getChildren()
          .subscribe(children => {
            this.children = children;
            this.getObservations();
          });
        });
  }

  getObservations(): void {
    if (this.filter_mode === 'All' || this.sessionUtils.isAllowed('ROLE_ADMIN')) {
      this.observationService.getObservations()
        .subscribe(obs => this.composeObservations(obs));
    } else {
      if (this.sessionUtils.isAllowed('ROLE_EDUCATOR')) {
        if (this.filter_mode === 'Mine') {
          this.observationService.getObservationsByEducator(this.sessionUtils.getId())
            .subscribe(obs => this.composeObservations(obs));
        } else {
          this.educatorAssignmentService.getObservationsByAssignedEducator(this.sessionUtils.getId())
            .subscribe(obs => this.composeObservations(obs));
        }
      } else {
        this.parentGuardianService.getObservationsByAssignedParentGuardian(this.sessionUtils.getId())
          .subscribe(obs => {
            obs = obs.filter(o => o.published === 1);
            this.composeObservations(obs);
          });
      }
    }
  }

  composeObservations(obs: Observation[]): void {
    this.observations = obs.map(o => Object.assign(new ObservationView(), {
      id: o.id,
      educator_id: o.educator_id,
      educator_name: this.educatorUtils.getNameFromList(this.educators, o.educator_id),
      child_id: o.educator_id,
      child_name: this.childUtils.getNameFromList(this.children, o.child_id),
      outcome_id: o.outcome_id,
      outcome: this.outcomeUtils.getOutcomeDescription(o.outcome_id),
      date_tracked: o.date_tracked,
      published: o.published
    }));
  }

  addNew(): void {
    this.router.navigateByUrl('observations/detail/0');
  }

  goToDetail(observation: ObservationView): void {
    this.router.navigateByUrl(`observations/detail/${observation.id}`);
  }
}
