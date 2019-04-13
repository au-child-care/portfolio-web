import { Component, OnInit, Input, TemplateRef, ViewChild } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { ActivatedRoute, Router } from '@angular/router';
import { ParentGuardian, ParentGuardianService, DateUtils, ParentGuardianAssignmentService, ParentGuardianAssignment, SessionUtils } from './../../../shared';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from 'ng2-bootstrap-modal';
import { ConfirmComponent } from 'src/app/shared/components/confirm.component';
import { ChildSelectorComponent } from 'src/app/shared/modules/child-selector/child-selector.component';

@Component({
    selector: 'app-parents-guardians-detail',
    templateUrl: './parents-guardians-detail.component.html',
    styleUrls: ['./parents-guardians-detail.component.scss'],
    animations: [routerTransition()]
})
export class ParentsGuardiansDetailComponent implements OnInit {
    @ViewChild(ChildSelectorComponent) childSelectorComponent;
    @Input() parentGuardian: ParentGuardian;
    assignedChildIds: number[];

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private toastr: ToastrService,
        private dialogService: DialogService,
        private parentGuardianService: ParentGuardianService,
        private parentGuardianAssignmentService: ParentGuardianAssignmentService,
        private dateUtils: DateUtils,
        private sessionUtils: SessionUtils) {}

    ngOnInit() {this.route.params.subscribe(params => {
        this.assignedChildIds = [];
        if (params['id'] > 0) {
            this.parentGuardianService.getParentGuardian(params['id'])
                .subscribe(parentGuardian => {
                    this.parentGuardian = parentGuardian;
                    this.parentGuardianAssignmentService.getByParentGuardian(parentGuardian.id)
                        .subscribe(assignment => {
                            this.assignedChildIds = assignment.map(a => a.child_id);
                        });
                });
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
            this.update(false, true, 'Unable to save');
        } else {
            this.create();
        }
    }

    create() {
        this.parentGuardian.centre_id = this.sessionUtils.getCentreId();
        this.parentGuardian.date_created = this.dateUtils.getCurrentDateString();
        this.parentGuardian.active = 0;
        this.parentGuardian.deleted = 0;
        this.parentGuardianService.createParentGuardian(this.parentGuardian)
            .subscribe(
                parentGuardian => {
                    this.parentGuardian = parentGuardian;
                    this.setChildAssignment('Unable to save');
                },
                error => {
                    this.toastr.error(error.error.email || error.statusText, 'Unable to save');
                });
    }

    update(routeOnSuccess: boolean, saveAssignments: boolean, failMessage: string): boolean {
        this.parentGuardianService.updateParentGuardian(this.parentGuardian)
        .subscribe(
            parentGuardian => {
                this.parentGuardian = parentGuardian;
                if (saveAssignments) {
                    this.setChildAssignment(failMessage);
                } else {
                    this.toastr.success('', 'Success');
                }

                if (routeOnSuccess) {
                    this.back();
                }

                return true;
            },
            error => {
                this.toastr.error(error.statusText, failMessage);
            });
        return false;
    }

    setChildAssignment(failMessage: string) {
        this.assignedChildIds = this.childSelectorComponent.children.filter(ch => ch.selected).map(c => c.id);
        this.parentGuardianAssignmentService.setByParentGuardian(
            this.parentGuardian.id,
            this.assignedChildIds.map(cid => Object.assign(new ParentGuardianAssignment(), {
                    parentguardian_id: this.parentGuardian.id,
                    child_id: cid
                })))
            .subscribe(success => {
                this.toastr.success('', 'Success');
            },
            error => {
                this.toastr.error(error.statusText, failMessage);
            });
    }

    activateDeactivate() {
        this.parentGuardian.date_modified = this.dateUtils.getCurrentDateString();
        this.parentGuardian.active = this.parentGuardian.active === 1 ? 0 : 1;
        this.update(false, false, 'Unable to update status');
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
        this.parentGuardianAssignmentService.deleteByParentGuardian(this.parentGuardian.id)
            .subscribe(
                success => this.update(true, false, 'Unable to delete'),
                error => {
                    this.toastr.error(error.statusText, 'Unable to delete');
                });
    }
}
