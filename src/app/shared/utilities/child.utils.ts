import { Injectable } from '@angular/core';
import { Child } from '../dtos';

@Injectable({ providedIn: 'root' })
export class ChildUtils {
    getNameFromList(children: Child[], id: number): string {
        const child = children.find(e => e.id === id);
        if (child) {
            return child.first_name + ' ' + child.last_name;
        }
        return 'Unknown';
    }
}
