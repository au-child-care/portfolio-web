import { Component, OnInit, Input } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Router } from '@angular/router';

import { Child, SessionUtils, EducatorAssignmentService, ParentGuardianAssignmentService } from './../../shared';
import { ChildService } from './../../shared';

@Component({
  selector: 'app-children',
  templateUrl: './children.component.html',
  styleUrls: ['./children.component.scss'],
  animations: [routerTransition()]
})
export class ChildrenComponent implements OnInit {
  children: Child[];
  @Input() filter_mode = this.sessionUtils.isAllowed('ROLE_ADMIN') ? 'All' : 'Under my care';

  constructor(
    private router: Router,
    private childService: ChildService,
    private educatorAssignmentService: EducatorAssignmentService,
    private parentGuardianService: ParentGuardianAssignmentService,
    public sessionUtils: SessionUtils) { }

  ngOnInit() {
    this.getChildren();
  }

  getChildren(): void {
    if (this.filter_mode === 'All' || this.sessionUtils.isAllowed('ROLE_ADMIN')) {
      this.childService.getChildren()
        .subscribe(children => this.children = children);
    } else {
      if (this.sessionUtils.isAllowed('ROLE_EDUCATOR')) {
        this.educatorAssignmentService.getChildrenByEducator(this.sessionUtils.getId())
          .subscribe(children => this.children = children);
      } else {
        this.parentGuardianService.getChildrenByParentGuardian(this.sessionUtils.getId())
          .subscribe(children => this.children = children);
      }
    }
  }

  addNew(): void {
    this.router.navigateByUrl('children/detail/0');
  }

  goToDetail(child: Child): void {
    this.router.navigateByUrl(`children/detail/${child.id}`);
  }
}
