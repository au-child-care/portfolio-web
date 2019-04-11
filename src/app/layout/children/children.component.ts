import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Router } from '@angular/router';

import { Child, SessionUtils } from './../../shared';
import { ChildService } from './../../shared';

@Component({
  selector: 'app-children',
  templateUrl: './children.component.html',
  styleUrls: ['./children.component.scss'],
  animations: [routerTransition()]
})
export class ChildrenComponent implements OnInit {
  children: Child[];

  constructor(
    private router: Router,
    private childService: ChildService,
    private sessionUtils: SessionUtils) { }

  ngOnInit() {
    this.getChildren();
  }

  getChildren(): void {
    this.childService.getChildren()
      .subscribe(children => this.children = children);
  }

  addNew(): void {
    this.router.navigateByUrl('children/detail/0');
  }

  goToDetail(child: Child): void {
    this.router.navigateByUrl(`children/detail/${child.id}`);
  }
}
