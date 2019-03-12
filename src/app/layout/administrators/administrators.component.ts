import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';

import { Administrator } from '../.././dtos/administrator';
import { AdministratorService } from '../.././services/administrator.service';

@Component({
  selector: 'app-administrators',
  templateUrl: './administrators.component.html',
  styleUrls: ['./administrators.component.scss'],
  animations: [routerTransition()]
})
export class AdministratorsComponent implements OnInit {
  administrators: Administrator[];

  constructor(private administratorService: AdministratorService) { }

  ngOnInit() {
    this.getAdministrators();
  }

  getAdministrators(): void {
    this.administratorService.getAdministrators()
    .subscribe(administrators => this.administrators = administrators);
  }
}
