export class OutcomeType {
    id = 0;
    description = '';
    short_description = '';

    constructor(id: number, description: string, short_description: string) {
        this.id = id;
        this.description = description;
        this.short_description = short_description;
    }
}
