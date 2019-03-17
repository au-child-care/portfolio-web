import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Router } from '@angular/router';

import { Educator } from './../../shared';
import { EducatorService } from './../../shared';

@Component({
  selector: 'app-educators',
  templateUrl: './educators.component.html',
  styleUrls: ['./educators.component.scss'],
  animations: [routerTransition()]
})
export class EducatorsComponent implements OnInit {
  educators: Educator[];

  constructor(private router: Router, private educatorService: EducatorService) { }

  ngOnInit() {
    this.getEducators();
  }

  getEducators(): void {
    this.educatorService.getEducators()
      .subscribe(educators => this.educators = educators);
  }

  addNew(): void {
    this.router.navigateByUrl('educators/detail/0');
  }

  goToDetail(educator: Educator): void {
    this.router.navigateByUrl(`educators/detail/${educator.id}`);
  }
}
