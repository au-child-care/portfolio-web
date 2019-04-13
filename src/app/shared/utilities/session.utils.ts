import { Injectable } from '@angular/core';
import { AuthenticateResponse, AccountDetails, CentreDetails } from '../dtos';

@Injectable({ providedIn: 'root' })
export class SessionUtils {
    setAccount(response: AuthenticateResponse) {
        localStorage.setItem('isLoggedin', 'true');
        localStorage.setItem('user_id', response.user_details.id.toString());
        localStorage.setItem('user_role', response.role);
        localStorage.setItem('user_name', response.user_details.first_name + ' ' + response.user_details.last_name);
        localStorage.setItem('user_details', JSON.stringify(response.user_details));
        localStorage.setItem('centre_id', response.centre_details.id.toString());
        localStorage.setItem('centre_name', response.centre_details.name);
        localStorage.setItem('centre_details', JSON.stringify(response.centre_details));
    }

    updateAccount(account: AccountDetails) {
        localStorage.setItem('user_name', account.first_name + ' ' + account.last_name);
        localStorage.setItem('user_details', JSON.stringify(account));
    }

    updateCentre(centre: CentreDetails) {
        localStorage.setItem('centre_name', centre.name);
        localStorage.setItem('centre_details', JSON.stringify(centre));
    }

    isLoggedIn(): boolean {
        return localStorage.getItem('isLoggedin') === 'true';
    }

    getId(): number {
        return +localStorage.getItem('user_id');
    }

    getUserName(): string {
        return localStorage.getItem('user_name');
    }

    getAccount(): AccountDetails {
        return JSON.parse(localStorage.getItem('user_details'));
    }

    getRole(): string {
        return localStorage.getItem('user_role');
    }

    getRolePath(): string {
        let path = '';
        switch (this.getRole()) {
            case 'ROLE_ADMIN':
                path = 'admin';
                break;
            case 'ROLE_EDUCATOR':
                path = 'educator';
                break;
            case 'ROLE_PARENT_GUARDIAN':
                path = 'parent-guardian';
                break;
        }
        return path;
    }

    getCentreId(): number {
        return +localStorage.getItem('centre_id');
    }

    getCentreName(): string {
        return localStorage.getItem('centre_name');
    }

    getCentre(): CentreDetails {
        return JSON.parse(localStorage.getItem('centre_details'));
    }

    isAllowed(...allowedRoles: string[]): boolean {
        return allowedRoles.find(r => r === this.getRole()) != null;
    }

    clearSession() {
        localStorage.clear();
    }
}

interface IRoleInterface {
    name: string;
}
