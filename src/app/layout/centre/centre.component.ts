import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { ActivatedRoute, Router } from '@angular/router';
import { DateUtils, SessionUtils, CentreDetails, CentreService } from 'src/app/shared';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from 'ng2-bootstrap-modal';
import { ConfirmComponent } from 'src/app/shared/components/confirm.component';

@Component({
    selector: 'app-centre',
    templateUrl: './centre.component.html',
    styleUrls: ['./centre.component.scss'],
    animations: [routerTransition()]
})
export class CentreComponent implements OnInit {
    @Input() centre: CentreDetails;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private toastr: ToastrService,
        private dialogService: DialogService,
        private centreService: CentreService,
        private dateUtils: DateUtils,
        public sessionUtils: SessionUtils) {}

    ngOnInit() {
        this.centre = this.sessionUtils.getCentre();
    }

    save() {
        this.centre.date_modified = this.dateUtils.getCurrentDateString();
        this.centreService.updateCentre(this.centre)
            .subscribe(result => {
                    this.sessionUtils.updateCentre(this.centre);
                    this.toastr.success('', 'Success');
                },
                error => {
                    this.toastr.error(error.error.centre_code || error.statusText, 'Unable to save');
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
