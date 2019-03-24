import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Router } from '@angular/router';

import { ChildService, Child } from './../../shared';

@Component({
  selector: 'app-children',
  templateUrl: './milestones.component.html',
  styleUrls: ['./milestones.component.scss'],
  animations: [routerTransition()]
})
export class MilestonesComponent implements OnInit {
  children: Child[];

  constructor(private router: Router, private childService: ChildService) { }

  ngOnInit() {
    this.getChildren();
  }

  getChildren(): void {
    this.childService.getChildren()
      .subscribe(children => this.children = children);
  }

  goToDetail(child: Child): void {
    this.router.navigateByUrl(`milestones/detail/${child.id}`);
  }
}
