export class MilestoneObservation {
    age_group = '';
    developmental_area = '';
    observation = '';

    constructor(age_group: string, developmental_area: string, observation: string) {
        this.age_group = age_group;
        this.developmental_area = developmental_area;
        this.observation = observation;
    }
}
