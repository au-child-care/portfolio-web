import { Injectable } from '@angular/core';
import { OutcomeType } from '../dtos';

@Injectable({ providedIn: 'root' })
export class OutcomeUtils {
    outcomes: OutcomeType[];

    constructor() {
        this.outcomes = [
            new OutcomeType(1, 'Children have a strong sense of identity'),
            new OutcomeType(2, 'Children are connected with and contribute to their world'),
            new OutcomeType(3, 'Children have a strong sense of wellbeing'),
            new OutcomeType(4, 'Children are confident and involved learners'),
            new OutcomeType(5, 'Children are effective communicators'),
        ];
    }

    getOutcomes(): OutcomeType[] {
        return this.outcomes;
    }

    getOutcomeDescription(id: number): string {
        const outcome = this.outcomes.find(o => o.id === id);
        if (outcome) {
            return outcome.description;
        }
        return 'Unknown';
    }
}
