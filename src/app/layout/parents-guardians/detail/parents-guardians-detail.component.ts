import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { ActivatedRoute, Router } from '@angular/router';
import { ParentGuardian, ParentGuardianService, DateUtils } from 'src/app/shared';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from 'ng2-bootstrap-modal';
import { ConfirmComponent } from 'src/app/shared/components/confirm.component';

@Component({
    selector: 'app-parents-guardians-detail',
    templateUrl: './parents-guardians-detail.component.html',
    styleUrls: ['./parents-guardians-detail.component.scss'],
    animations: [routerTransition()]
})
export class ParentsGuardiansDetailComponent implements OnInit {
    @Input() parentGuardian: ParentGuardian;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private toastr: ToastrService,
        private dialogService: DialogService,
        private parentGuardianService: ParentGuardianService,
        private dateUtils: DateUtils) {}

    ngOnInit() {this.route.params.subscribe(params => {
        if (params['id'] > 0) {
            this.parentGuardianService.getParentGuardian(params['id'])
                .subscribe(parentGuardian => this.parentGuardian = parentGuardian);
        } else {
            this.parentGuardian = new ParentGuardian();
        }
      });
    }

    back() {
        this.router.navigateByUrl('parents-guardians');
    }

    save() {
        this.parentGuardian.date_modified = this.dateUtils.getCurrentDateString();
        if (this.parentGuardian.id > 0) {
            this.update(false, 'Unable to save');
        } else {
            this.parentGuardian.date_created = this.dateUtils.getCurrentDateString();
            this.parentGuardian.active = 0;
            this.parentGuardian.deleted = 0;
            this.parentGuardianService.createParentGuardian(this.parentGuardian)
                .subscribe(
                    parentGuardian => {
                        this.parentGuardian = parentGuardian;
                        this.toastr.success('', 'Success');
                    },
                    error => {
                        this.toastr.error(error.statusText, 'Unable to save');
                    });
        }
    }

    update(routeOnSuccess: boolean, failMessage: string) {
        this.parentGuardianService.updateParentGuardian(this.parentGuardian)
        .subscribe(
            parentGuardian => {
                this.parentGuardian = parentGuardian;
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
        this.parentGuardian.date_modified = this.dateUtils.getCurrentDateString();
        this.parentGuardian.active = this.parentGuardian.active === 1 ? 0 : 1;
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
        this.parentGuardian.date_modified = this.dateUtils.getCurrentDateString();
        this.parentGuardian.deleted = 1;
        this.update(true, 'Unable to delete');
    }
}
