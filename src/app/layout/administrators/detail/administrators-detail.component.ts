import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { ActivatedRoute } from '@angular/router';
import { Administrator, AdministratorService } from 'src/app/shared';

@Component({
    selector: 'app-administrators-detail',
    templateUrl: './administrators-detail.component.html',
    styleUrls: ['./administrators-detail.component.scss'],
    animations: [routerTransition()]
})
export class AdministratorsDetailComponent implements OnInit {
    admin: Administrator;

    constructor(private route: ActivatedRoute, private administratorService: AdministratorService) {}

    ngOnInit() {this.route.params.subscribe(params => {
        if (params['id'] === 0) {
            this.admin = new Administrator();
        } else {
            this.administratorService.getAdministrator(params['id'])
            .subscribe(admin => this.admin = admin);
        }
      });
    }
}
