import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { ActivatedRoute, Router } from '@angular/router';
import { Educator, EducatorService, DateUtils } from 'src/app/shared';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from 'ng2-bootstrap-modal';
import { ConfirmComponent } from 'src/app/shared/components/confirm.component';

@Component({
    selector: 'app-educators-detail',
    templateUrl: './educators-detail.component.html',
    styleUrls: ['./educators-detail.component.scss'],
    animations: [routerTransition()]
})
export class EducatorsDetailComponent implements OnInit {
    @Input() educator: Educator;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private toastr: ToastrService,
        private dialogService: DialogService,
        private educatorService: EducatorService,
        private dateUtils: DateUtils) {}

    ngOnInit() {this.route.params.subscribe(params => {
        if (params['id'] > 0) {
            this.educatorService.getEducator(params['id'])
                .subscribe(educator => this.educator = educator);
        } else {
            this.educator = new Educator();
        }
      });
    }

    back() {
        this.router.navigateByUrl('educators');
    }

    save() {
        this.educator.date_modified = this.dateUtils.getCurrentDateString();
        if (this.educator.id > 0) {
            this.update(false, 'Unable to save');
        } else {
            this.educator.date_created = this.dateUtils.getCurrentDateString();
            this.educator.active = 0;
            this.educator.deleted = 0;
            this.educator.last_activity = null;
            this.educatorService.createEducator(this.educator)
                .subscribe(
                    educator => {
                        this.educator = educator;
                        this.toastr.success('', 'Success');
                    },
                    error => {
                        this.toastr.error(error.statusText, 'Unable to save');
                    });
        }
    }

    update(routeOnSuccess: boolean, failMessage: string) {
        this.educatorService.updateEducator(this.educator)
        .subscribe(
            educator => {
                this.educator = educator;
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
        this.educator.date_modified = this.dateUtils.getCurrentDateString();
        this.educator.active = this.educator.active === 1 ? 0 : 1;
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
        this.educator.date_modified = this.dateUtils.getCurrentDateString();
        this.educator.deleted = 1;
        this.update(true, 'Unable to delete');
    }
}
