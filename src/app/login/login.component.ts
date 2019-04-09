import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { routerTransition } from '../router.animations';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
    @Input() email: string;
    @Input() password: string;
    @Input() roleEducator = true;
    @Input() roleAdmin = false;
    @Input() roleParentGuardian = false;

    constructor(
        private translate: TranslateService,
        public router: Router
        ) {
            this.translate.addLangs(['en', 'fr', 'ur', 'es', 'it', 'fa', 'de', 'zh-CHS']);
            this.translate.setDefaultLang('en');
            const browserLang = this.translate.getBrowserLang();
            this.translate.use(browserLang.match(/en|fr|ur|es|it|fa|de|zh-CHS/) ? browserLang : 'en');
    }

    ngOnInit() {}

    onLoggedin() {
        localStorage.setItem('isLoggedin', 'true');
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
