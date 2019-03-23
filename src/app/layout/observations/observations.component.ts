import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Router } from '@angular/router';

import { ObservationView, ObservationService, ChildService, OutcomeUtils } from './../../shared';

@Component({
  selector: 'app-children',
  templateUrl: './observations.component.html',
  styleUrls: ['./observations.component.scss'],
  animations: [routerTransition()]
})
export class ObservationsComponent implements OnInit {
  observations: ObservationView[];

  constructor(
    private router: Router,
    private observationService: ObservationService,
    private childService: ChildService,
    private outcomeUtils: OutcomeUtils) { }

  ngOnInit() {
    this.getObservations();
  }

  getObservations(): void {
    this.observationService.getObservations()
      .subscribe(obs => {
        this.childService.getChildren()
                .subscribe(children => {
                    this.observations = obs.map(o => Object.assign(new ObservationView(), {
                        id: o.id,
                        educator_id: o.educator_id,
                        child_id: o.educator_id,
                        child_name: children.find(c => c.id === o.child_id).first_name + ' ' + children.find(c => c.id === o.child_id).last_name,
                        outcome_id: o.outcome_id,
                        outcome: this.outcomeUtils.getOutcomeDescription(o.outcome_id),
                        date_tracked: o.date_tracked,
                        published: o.published
                }));
            });
      });
  }

  addNew(): void {
    this.router.navigateByUrl('observations/detail/0');
  }

  goToDetail(observation: ObservationView): void {
    this.router.navigateByUrl(`observations/detail/${observation.id}`);
  }
}
