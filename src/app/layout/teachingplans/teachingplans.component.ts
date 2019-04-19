import { Component, OnInit, Input } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Router } from '@angular/router';

import { TeachingPlanView, TeachingPlanService, ChildService, OutcomeUtils, EducatorService, EducatorUtils, ChildUtils, SessionUtils, Educator, Child, TeachingPlan, EducatorAssignmentService, ParentGuardianAssignmentService } from './../../shared';

@Component({
  selector: 'app-children',
  templateUrl: './teachingplans.component.html',
  styleUrls: ['./teachingplans.component.scss'],
  animations: [routerTransition()]
})
export class TeachingPlansComponent implements OnInit {
  teachingPlans: TeachingPlanView[];
  educators: Educator[];
  children: Child[];
  @Input() filter_mode = this.sessionUtils.isAllowed('ROLE_ADMIN') ? 'All' : 'Mine';

  constructor(
    private router: Router,
    private teachingPlanService: TeachingPlanService,
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
            this.getTeachingPlans();
          });
        });
  }

  getTeachingPlans(): void {
    if (this.filter_mode === 'All' || this.sessionUtils.isAllowed('ROLE_ADMIN')) {
      this.teachingPlanService.getTeachingPlans()
        .subscribe(tps => this.composeTeachingPlans(tps));
    } else {
      if (this.sessionUtils.isAllowed('ROLE_EDUCATOR')) {
        if (this.filter_mode === 'Mine') {
          this.teachingPlanService.getTeachingPlansByEducator(this.sessionUtils.getId())
            .subscribe(tps => this.composeTeachingPlans(tps));
        } else {
          this.educatorAssignmentService.getTeachingPlansByAssignedEducator(this.sessionUtils.getId())
            .subscribe(tps => this.composeTeachingPlans(tps));
        }
      } else {
        this.parentGuardianService.getTeachingPlansByAssignedParentGuardian(this.sessionUtils.getId())
          .subscribe(tps => this.composeTeachingPlans(tps));
      }
    }
  }

  composeTeachingPlans(tps: TeachingPlan[]): void {
    this.teachingPlans = tps.map(tp => Object.assign(new TeachingPlanView(), {
      id: tp.id,
      educator_id: tp.educator_id,
      educator_name: this.educatorUtils.getNameFromList(this.educators, tp.educator_id),
      child_id: tp.educator_id,
      child_name: this.childUtils.getNameFromList(this.children, tp.child_id),
      title: tp.title,
      target_outcome_id: tp.target_outcome_id,
      target_outcome: this.outcomeUtils.getOutcomeDescription(tp.target_outcome_id),
      target_date: tp.target_date,
      done: tp.done
    }));
  }

  addNew(): void {
    this.router.navigateByUrl('teachingplans/detail/0');
  }

  goToDetail(teachingPlan: TeachingPlanView): void {
    this.router.navigateByUrl(`teachingplans/detail/${teachingPlan.id}`);
  }
}
