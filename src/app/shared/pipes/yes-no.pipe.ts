import { Pipe, PipeTransform } from '@angular/core';
@Pipe({name: 'yesno'})
export class YesNoPipe implements PipeTransform {
    transform(value: any): string {
        return value === 1 ? 'Yes' : 'No';
    }
}
