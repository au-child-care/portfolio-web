import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { SessionUtils } from '../utilities';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        public sessionUtils: SessionUtils) {}

    canActivate(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.sessionUtils.isLoggedIn()) {
            return true;
        }

        this.router.navigate(['/login']);
        return false;
    }
}
