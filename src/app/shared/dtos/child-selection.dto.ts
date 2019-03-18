export class ChildSelection {
    id = 0;
    name = '';
    group = '';
    selected = false;

    constructor(id: number, name: string, group: string, selected: boolean) {
        this.id = id;
        this.name = name;
        this.group = group;
        this.selected = selected;
    }
}
