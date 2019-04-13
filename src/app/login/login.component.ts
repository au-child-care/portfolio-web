import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { routerTransition } from '../router.animations';
import { AccountService, SessionUtils } from '../shared';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
    @Input() centre_code: string;
    @Input() email: string;
    @Input() password: string;
    @Input() roleEducator = true;
    @Input() roleAdmin = false;
    @Input() roleParentGuardian = false;
    errorMessage: string;

    constructor(
        private translate: TranslateService,
        public router: Router,
        private accountService: AccountService,
        private sessionUtils: SessionUtils
        ) {
            this.translate.addLangs(['en', 'fr', 'ur', 'es', 'it', 'fa', 'de', 'zh-CHS']);
            this.translate.setDefaultLang('en');
            const browserLang = this.translate.getBrowserLang();
            this.translate.use(browserLang.match(/en|fr|ur|es|it|fa|de|zh-CHS/) ? browserLang : 'en');
    }

    ngOnInit() {
        this.sessionUtils.clearSession();
    }

    login() {
        const request = {
            centre_code: this.centre_code,
            email: this.email,
            password: this.password,
            role: this.roleAdmin ? 'ROLE_ADMIN' :
                this.roleEducator ? 'ROLE_EDUCATOR' :
                this.roleParentGuardian ? 'ROLE_PARENT_GUARDIAN' :
                'Unknown'
        };
        this.accountService.authenticate(request)
            .subscribe(response => {
                this.sessionUtils.setAccount(response);
                this.router.navigateByUrl(`dashboard-${this.sessionUtils.getRolePath()}`);
            },
            error => {
                this.errorMessage = error.error.message;
            });

    }

    updateRoleToggle(sender: number) {
        switch (sender) {
            case 1:
                this.roleEducator = true;
                this.roleAdmin = false;
                this.roleParentGuardian = false;
            break;
            case 2:
                this.roleEducator = false;
                this.roleAdmin = true;
                this.roleParentGuardian = false;
            break;
            case 3:
                this.roleEducator = false;
                this.roleAdmin = false;
                this.roleParentGuardian = true;
            break;
        }
    }
}
