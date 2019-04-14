import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { ActivatedRoute, Router } from '@angular/router';
import { Administrator, AdministratorService, DateUtils, SessionUtils, AccountDetails, AccountService, PasswordUtils } from 'src/app/shared';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from 'ng2-bootstrap-modal';
import { ConfirmComponent } from 'src/app/shared/components/confirm.component';

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.scss'],
    animations: [routerTransition()]
})
export class AccountComponent implements OnInit {
    @Input() account: AccountDetails;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private toastr: ToastrService,
        private dialogService: DialogService,
        private accountService: AccountService,
        private dateUtils: DateUtils,
        private sessionUtils: SessionUtils,
        private passwordUtils: PasswordUtils) {}

    ngOnInit() {
        this.account = this.sessionUtils.getAccount();
        this.account.password = this.passwordUtils.getDummyPassword();
    }

    save() {
        this.account.date_modified = this.dateUtils.getCurrentDateString();
        this.accountService.update(this.sessionUtils.getRole(), this.account)
            .subscribe(result => {
                    this.sessionUtils.updateAccount(this.account);
                    this.toastr.success('', 'Success');
                },
                error => {
                    this.toastr.error(error.error.email || error.statusText, 'Unable to save');
                });
    }

    showConfirm(template: TemplateRef<any>) {
        this.dialogService.addDialog(
            ConfirmComponent,
            {
                title: 'Confirm update',
                message: 'Are you sure you want to proceed?'
            })
                .subscribe((isConfirmed) => {
                    if (isConfirmed) {
                        this.save();
                    }
                });
    }
}
