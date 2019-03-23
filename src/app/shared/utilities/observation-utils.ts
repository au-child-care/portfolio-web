import { Injectable } from '@angular/core';
import { ObservationType } from '../dtos';

@Injectable({ providedIn: 'root' })
export class ObservationUtils {
    getObservationTypes(): ObservationType[] {
        return [
            new ObservationType(1, 'Children have a strong sense of identity'),
            new ObservationType(2, 'Children are connected with and contribute to their world'),
            new ObservationType(3, 'Children have a strong sense of wellbeing'),
            new ObservationType(4, 'Children are confident and involved learners'),
            new ObservationType(5, 'Children are effective communicators'),
        ];
    }

    getObservationDescription(id: number): string {
        return this.getObservationTypes().find(o => o.id === id).description || 'Unknown';
    }
}
