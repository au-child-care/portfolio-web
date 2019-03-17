import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DateUtils {
    getCurrentDateString(): string {
        const d = new Date();
        const currentDate = [d.getFullYear(),
            d.getMonth() + 1,
            d.getDate()].join('-') + ' ' +
           [d.getHours(),
            d.getMinutes(),
            d.getSeconds()].join(':');
        return currentDate;
    }
}
