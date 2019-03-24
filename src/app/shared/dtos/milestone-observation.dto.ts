export class MilestoneObservation {
    child_id = 0;
    age_group = '';
    developmental_area = '';
    observation = '';
    outcome_id = 0;
    date_tracked = '';
    educator_id = 0;
    educator_name = '';
    selected = 0;

    constructor(age_group: string, developmental_area: string, observation: string) {
        this.age_group = age_group;
        this.developmental_area = developmental_area;
        this.observation = observation;
    }
}
