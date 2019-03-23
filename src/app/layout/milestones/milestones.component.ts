import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Router } from '@angular/router';

import { MilestoneView, MilestoneService, ChildService, OutcomeUtils, EducatorService, EducatorUtils, ChildUtils } from './../../shared';

@Component({
  selector: 'app-children',
  templateUrl: './milestones.component.html',
  styleUrls: ['./milestones.component.scss'],
  animations: [routerTransition()]
})
export class MilestonesComponent implements OnInit {
  milestones: MilestoneView[];

  constructor(
    private router: Router,
    private milestoneService: MilestoneService,
    private educatorService: EducatorService,
    private educatorUtils: EducatorUtils,
    private childService: ChildService,
    private childUtils: ChildUtils,
    private outcomeUtils: OutcomeUtils) { }

  ngOnInit() {
    this.getMilestones();
  }

  getMilestones(): void {
    this.milestoneService.getMilestones()
      .subscribe(obs => {
        this.educatorService.getEducators()
          .subscribe(educators => {
            this.childService.getChildren()
              .subscribe(children => {
                this.milestones = obs.map(o => Object.assign(new MilestoneView(), {
                    id: o.id,
                    educator_id: o.educator_id,
                    educator_name: this.educatorUtils.getNameFromList(educators, o.educator_id),
                    child_id: o.educator_id,
                    child_name: this.childUtils.getNameFromList(children, o.child_id),
                    age_group: o.age_group,
                    developmental_area: o.developmental_area,
                    outcome_id: o.outcome_id,
                    outcome: this.outcomeUtils.getOutcomeDescription(o.outcome_id),
                    date_tracked: o.date_tracked,
                    published: o.published
                  }));
              });
            });
      });
  }

  addNew(): void {
    this.router.navigateByUrl('milestones/detail/0');
  }

  goToDetail(milestone: MilestoneView): void {
    this.router.navigateByUrl(`milestones/detail/${milestone.id}`);
  }
}
