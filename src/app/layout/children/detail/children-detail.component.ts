import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { ActivatedRoute, Router } from '@angular/router';
import { Child, ChildService, DateUtils, ParentGuardianAssignmentService, EducatorAssignmentService, ParentGuardian, Educator } from 'src/app/shared';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from 'ng2-bootstrap-modal';
import { ConfirmComponent } from 'src/app/shared/components/confirm.component';

@Component({
    selector: 'app-children-detail',
    templateUrl: './children-detail.component.html',
    styleUrls: ['./children-detail.component.scss'],
    animations: [routerTransition()]
})
export class ChildrenDetailComponent implements OnInit {
    @Input() child: Child;
    assignedParentsGuardians: ParentGuardian[];
    assignedEducators: Educator[];

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private toastr: ToastrService,
        private dialogService: DialogService,
        private childService: ChildService,
        private parentGuardianAssignmentService: ParentGuardianAssignmentService,
        private educatorAssignmentService: EducatorAssignmentService,
        private dateUtils: DateUtils) {}

    ngOnInit() {this.route.params.subscribe(params => {
        if (params['id'] > 0) {
            this.childService.getChild(params['id'])
                .subscribe(child => {
                    this.child = child;
                    this.educatorAssignmentService.getEducatorsByChild(this.child.id)
                        .subscribe(educators => this.assignedEducators = educators);
                    this.parentGuardianAssignmentService.getParentsGuardiansByChild(this.child.id)
                        .subscribe(parentsGuardians => this.assignedParentsGuardians = parentsGuardians);
                });
        } else {
            this.child = new Child();
        }
      });
    }

    back() {
        this.router.navigateByUrl('children');
    }

    save() {
        this.child.date_modified = this.dateUtils.getCurrentDateString();
        if (this.child.id > 0) {
            this.update(false, 'Unable to save');
        } else {
            this.child.date_created = this.dateUtils.getCurrentDateString();
            this.child.active = 0;
            this.child.deleted = 0;
            this.child.last_activity = null;
            this.childService.createChild(this.child)
                .subscribe(
                    child => {
                        this.child = child;
                        this.toastr.success('', 'Success');
                    },
                    error => {
                        this.toastr.error(error.statusText, 'Unable to save');
                    });
        }
    }

    update(routeOnSuccess: boolean, failMessage: string) {
        this.childService.updateChild(this.child)
        .subscribe(
            child => {
                this.child = child;
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
        this.child.date_modified = this.dateUtils.getCurrentDateString();
        this.child.active = this.child.active === 1 ? 0 : 1;
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
        this.child.date_modified = this.dateUtils.getCurrentDateString();
        this.child.deleted = 1;
        this.update(true, 'Unable to delete');
    }
}
