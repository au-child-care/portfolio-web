import { Injectable } from '@angular/core';
import { AuthenticateResponse, AccountDetails } from '../dtos';

@Injectable({ providedIn: 'root' })
export class SessionUtils {
    setAccount(response: AuthenticateResponse) {
        localStorage.setItem('isLoggedin', 'true');
        localStorage.setItem('user_id', response.user_details.id.toString());
        localStorage.setItem('user_role', response.role);
        localStorage.setItem('user_name', response.user_details.first_name + ' ' + response.user_details.last_name);
        localStorage.setItem('user_details', JSON.stringify(response.user_details));
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
