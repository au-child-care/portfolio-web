import { Injectable } from '@angular/core';
import { Educator } from '../dtos';

@Injectable({ providedIn: 'root' })
export class EducatorUtils {
    getNameFromList(educators: Educator[], id: number): string {
        const educator = educators.find(e => e.id === id);
        if (educator) {
            return educator.first_name + ' ' + educator.last_name;
        }
        return 'Unknown';
    }
}
