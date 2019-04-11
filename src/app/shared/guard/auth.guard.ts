import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { SessionUtils } from '../utilities';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private sessionUtils: SessionUtils) {}

    canActivate() {
        if (this.sessionUtils.isLoggedIn()) {
            return true;
        }

        this.router.navigate(['/login']);
        return false;
    }
}
