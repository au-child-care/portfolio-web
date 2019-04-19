import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { ActivatedRoute, Router } from '@angular/router';
import { Administrator, AdministratorService, DateUtils, SessionUtils, PasswordUtils } from 'src/app/shared';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from 'ng2-bootstrap-modal';
import { ConfirmComponent } from 'src/app/shared/components/confirm.component';

@Component({
    selector: 'app-administrators-detail',
    templateUrl: './administrators-detail.component.html',
    styleUrls: ['./administrators-detail.component.scss'],
    animations: [routerTransition()]
})
export class AdministratorsDetailComponent implements OnInit {
    @Input() admin: Administrator;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private toastr: ToastrService,
        private dialogService: DialogService,
        private administratorService: AdministratorService,
        private dateUtils: DateUtils,
        public sessionUtils: SessionUtils,
        private passwordUtils: PasswordUtils) {}

    ngOnInit() {this.route.params.subscribe(params => {
        if (params['id'] > 0) {
            this.administratorService.getAdministrator(params['id'])
                .subscribe(admin => {
                    this.admin = admin;
                    this.admin.password = this.passwordUtils.getDummyPassword();
                });
        } else {
            this.admin = new Administrator();
        }
      });
    }

    back() {
        this.router.navigateByUrl('administrators');
    }

    save() {
        this.admin.date_modified = this.dateUtils.getCurrentDateString();
        if (this.admin.id > 0) {
            this.update(false, 'Unable to save');
        } else {
            this.admin.centre_id = this.sessionUtils.getCentreId();
            this.admin.date_created = this.dateUtils.getCurrentDateString();
            this.admin.active = 0;
            this.admin.deleted = 0;
            this.administratorService.createAdministrator(this.admin)
                .subscribe(
                    admin => {
                        this.admin = admin;
                        this.admin.password = this.passwordUtils.getDummyPassword();
                        this.toastr.success('', 'Success');
                    },
                    error => {
                        this.toastr.error(error.error.email || error.statusText, 'Unable to save');
                    });
        }
    }

    update(routeOnSuccess: boolean, failMessage: string) {
        this.administratorService.updateAdministrator(this.admin)
        .subscribe(
            admin => {
                this.admin = admin;
                this.admin.password = this.passwordUtils.getDummyPassword();
                this.toastr.success('', 'Success');
                if (routeOnSuccess) {
                    this.back();
                }
            },
            error => {
                this.toastr.error(error.statusText, failMessage);
            });
    }

    activateDeactivate() {
        this.admin.date_modified = this.dateUtils.getCurrentDateString();
        this.admin.active = this.admin.active === 1 ? 0 : 1;
        this.update(false, 'Unable to update status');
    }

    showConfirm(template: TemplateRef<any>) {
        this.dialogService.addDialog(
            ConfirmComponent,
            {
                title: 'Confirm deletion',
                message: 'Are you sure you want to proceed?'
            })
                .subscribe((isConfirmed) => {
                    if (isConfirmed) {
                        this.delete();
                    }
                });
    }

    delete() {
        this.admin.date_modified = this.dateUtils.getCurrentDateString();
        this.admin.deleted = 1;
        this.update(true, 'Unable to delete');
    }
}
