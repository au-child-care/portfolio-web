
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PasswordUtils {
    getDummyPassword(): string {
        return '!^%~dUMmY.P@s5w0rD&!';
    }

    removeDummyPassword(entity: any): any {
        const newEntity = Object.assign({}, entity);
        if (newEntity['password'] === this.getDummyPassword()) {
            newEntity['password'] = null;
        }
        return newEntity;
    }
}
