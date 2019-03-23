import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Router } from '@angular/router';

import { TeachingPlanView, TeachingPlanService, ChildService, OutcomeUtils, EducatorService, EducatorUtils, ChildUtils } from './../../shared';

@Component({
  selector: 'app-children',
  templateUrl: './teachingPlans.component.html',
  styleUrls: ['./teachingPlans.component.scss'],
  animations: [routerTransition()]
})
export class TeachingPlansComponent implements OnInit {
  teachingPlans: TeachingPlanView[];

  constructor(
    private router: Router,
    private teachingPlanService: TeachingPlanService,
    private educatorService: EducatorService,
    private educatorUtils: EducatorUtils,
    private childService: ChildService,
    private childUtils: ChildUtils,
    private outcomeUtils: OutcomeUtils) { }

  ngOnInit() {
    this.getTeachingPlans();
  }

  getTeachingPlans(): void {
    this.teachingPlanService.getTeachingPlans()
      .subscribe(obs => {
        this.educatorService.getEducators()
          .subscribe(educators => {
            this.childService.getChildren()
              .subscribe(children => {
                this.teachingPlans = obs.map(o => Object.assign(new TeachingPlanView(), {
                    id: o.id,
                    educator_id: o.educator_id,
                    educator_name: this.educatorUtils.getNameFromList(educators, o.educator_id),
                    child_id: o.educator_id,
                    child_name: this.childUtils.getNameFromList(children, o.child_id),
                    title: o.title,
                    target_outcome_id: o.target_outcome_id,
                    target_outcome: this.outcomeUtils.getOutcomeDescription(o.target_outcome_id),
                    target_date: o.target_date,
                    done: o.done
                  }));
              });
            });
      });
  }

  addNew(): void {
    this.router.navigateByUrl('teachingPlans/detail/0');
  }

  goToDetail(teachingPlan: TeachingPlanView): void {
    this.router.navigateByUrl(`teachingPlans/detail/${teachingPlan.id}`);
  }
}
