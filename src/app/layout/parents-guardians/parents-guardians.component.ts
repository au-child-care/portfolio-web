import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Router } from '@angular/router';

import { ParentGuardian } from './../../shared';
import { ParentGuardianService } from './../../shared';

@Component({
  selector: 'app-parents-guardians',
  templateUrl: './parents-guardians.component.html',
  styleUrls: ['./parents-guardians.component.scss'],
  animations: [routerTransition()]
})
export class ParentsGuardiansComponent implements OnInit {
  parentsGuardians: ParentGuardian[];

  constructor(private router: Router, private parentGuardianService: ParentGuardianService) { }

  ngOnInit() {
    this.getParentsGuardians();
  }

  getParentsGuardians(): void {
    this.parentGuardianService.getParentsGuardians()
      .subscribe(parentsGuardians => this.parentsGuardians = parentsGuardians);
  }

  addNew(): void {
    this.router.navigateByUrl('parents-guardians/detail/0');
  }

  goToDetail(parentGuardian: ParentGuardian): void {
    this.router.navigateByUrl(`parents-guardians/detail/${parentGuardian.id}`);
  }
}
