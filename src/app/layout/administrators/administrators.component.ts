import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Router } from '@angular/router';

import { Administrator } from './../../shared';
import { AdministratorService } from './../../shared';

@Component({
  selector: 'app-administrators',
  templateUrl: './administrators.component.html',
  styleUrls: ['./administrators.component.scss'],
  animations: [routerTransition()]
})
export class AdministratorsComponent implements OnInit {
  administrators: Administrator[];

  constructor(private router: Router, private administratorService: AdministratorService) { }

  ngOnInit() {
    this.getAdministrators();
  }

  getAdministrators(): void {
    this.administratorService.getAdministrators()
    .subscribe(administrators => this.administrators = administrators);
  }

  addNew(): void {
    this.router.navigateByUrl('administrators/detail/0');
  }

  goToDetail(admin: Administrator): void {
    this.router.navigateByUrl('administrators/detail/' + admin.id);
  }
}
