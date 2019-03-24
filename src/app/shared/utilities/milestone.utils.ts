import { Injectable } from '@angular/core';
import { MilestoneObservation } from '../dtos/milestone-observation.dto';

@Injectable({ providedIn: 'root' })
export class MilestoneUtils {
    milestoneOnservations: MilestoneObservation[];

    constructor() {
        // TO DO: List everything from EYLF
        this.milestoneOnservations = [
            new MilestoneObservation('Birth to 4 months', 'Physical', 'moves whole body'),
            new MilestoneObservation('Birth to 4 months', 'Physical', 'squirms, arms wave, legs move up and down'),
            new MilestoneObservation('4 to 8 months', 'Social', 'reacts with arousal, attention or approach to presence of another baby or young child'),
            new MilestoneObservation('4 to 8 months', 'Social', 'responds to own name'),
            new MilestoneObservation('8 to 12 months', 'Emotional', 'actively seeks to be next to parent or principal caregiver'),
            new MilestoneObservation('8 to 12 months', 'Emotional', 'shows signs of anxiety or stress if parent goes away'),
            new MilestoneObservation('1 to 2 years', 'Cognitive', 'repeats actions that lead to interesting/predictable results, e.g. bangs spoon on saucepan'),
            new MilestoneObservation('1 to 2 years', 'Cognitive', 'points to objects when named'),
            new MilestoneObservation('2 to 3 years', 'Language', 'uses two or three words together, e.g. “go potty now”'),
            new MilestoneObservation('2 to 3 years', 'Language', '‘explosion’ of vocabulary and use of correct grammatical forms of language'),
            new MilestoneObservation('3 to 5 years', 'Seek advice', 'is not understood by others'),
            new MilestoneObservation('3 to 5 years', 'Seek advice', 'has speech fluency problems or stammering'),
        ];
    }

    getObservations(): MilestoneObservation[] {
        return this.milestoneOnservations;
    }

    getObservationsByAgeAndArea(age_group: string, developmental_area: string): MilestoneObservation[] {
        return this.milestoneOnservations.filter(o => o.age_group === age_group && o.developmental_area === developmental_area);
    }
}
