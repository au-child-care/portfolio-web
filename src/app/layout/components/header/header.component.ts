import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SessionUtils, NotificationService } from 'src/app/shared';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    public pushRightClass: string;
    hasNewNotifications = true;
    user_name: string;

    constructor(
        private translate: TranslateService,
        public router: Router,
        private notificationService: NotificationService,
        private sessionUtils: SessionUtils) {

        this.translate.addLangs(['en', 'fr', 'ur', 'es', 'it', 'fa', 'de', 'zh-CHS']);
        this.translate.setDefaultLang('en');
        const browserLang = this.translate.getBrowserLang();
        this.translate.use(browserLang.match(/en|fr|ur|es|it|fa|de|zh-CHS/) ? browserLang : 'en');

        this.router.events.subscribe(val => {
            if (
                val instanceof NavigationEnd &&
                window.innerWidth <= 992 &&
                this.isToggled()
            ) {
                this.toggleSidebar();
            }
        });
    }

    ngOnInit() {
        this.pushRightClass = 'push-right';
        this.user_name = this.sessionUtils.getUserName();
        this.notificationService.getNotificationsByRecipient(this.sessionUtils.getId(), this.sessionUtils.getRole())
            .subscribe(notifs => this.hasNewNotifications = notifs.filter(n => n.marked_read === 0).length > 0);
    }

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }

    onLoggedout() {
        this.sessionUtils.clearSession();
    }

    changeLang(language: string) {
        this.translate.use(language);
    }

    goToDashboard() {
        this.router.navigateByUrl(`dashboard-${this.sessionUtils.getRolePath()}`);
    }
}
