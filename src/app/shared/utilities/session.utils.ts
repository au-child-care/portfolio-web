import { Injectable } from '@angular/core';
import { AuthenticateResponse, AccountDetails } from '../dtos';

@Injectable({ providedIn: 'root' })
export class SessionUtils {
    setAccount(response: AuthenticateResponse) {
        localStorage.setItem('isLoggedin', 'true');
        localStorage.setItem('user_role', response.role);
        localStorage.setItem('user_name', response.user_details.first_name + ' ' + response.user_details.last_name);
        localStorage.setItem('user_details', JSON.stringify(response.user_details));
    }

    isLoggedIn(): boolean {
        return localStorage.getItem('isLoggedin') === 'true';
    }

    getUserName(): string {
        return localStorage.getItem('user_name');
    }

    getAccount(): AccountDetails {
        return JSON.parse(localStorage.getItem('user_details'));
    }

    clearSession() {
        localStorage.clear();
    }
}
