import { Component, OnInit, Input } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { ActivatedRoute } from '@angular/router';
import { Administrator, AdministratorService } from 'src/app/shared';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-administrators-detail',
    templateUrl: './administrators-detail.component.html',
    styleUrls: ['./administrators-detail.component.scss'],
    animations: [routerTransition()]
})
export class AdministratorsDetailComponent implements OnInit {
    @Input() admin: Administrator;

    constructor(
        private route: ActivatedRoute,
        private toastr: ToastrService,
        private administratorService: AdministratorService) {}

    ngOnInit() {this.route.params.subscribe(params => {
        if (params['id'] > 0) {
            this.administratorService.getAdministrator(params['id'])
                .subscribe(admin => this.admin = admin);
        } else {
            this.admin = new Administrator();
        }
      });
    }

    save() {
        const d = new Date();
        const currentDate = [d.getFullYear(),
            d.getMonth() + 1,
            d.getDate()].join('-') + ' ' +
           [d.getHours(),
            d.getMinutes(),
            d.getSeconds()].join(':');
        this.admin.date_modified = currentDate;
        if (this.admin.id > 0) {
            this.administratorService.updateAdministrator(this.admin)
                .subscribe(
                    admin => {
                        this.admin = admin;
                        this.toastr.success('', 'Success');
                    },
                    error => {
                        this.toastr.error(error.statusText, 'Unable to save');
                    });
        } else {
            this.admin.date_created = currentDate;
            this.admin.active = 0;
            this.admin.deleted = 0;
            this.administratorService.createAdministrator(this.admin)
                .subscribe(
                    admin => {
                        this.admin = admin;
                        this.toastr.success('', 'Success');
                    },
                    error => {
                        this.toastr.error(error.statusText, 'Unable to save');
                    });
        }
    }
}
