export class Report {
    code = '';
    title = '';
    description = '';
    filenamePrefix = '';
    roles: string[] = [];
    showChildrenList = false;
    showEducatorsList = false;
    selectedChildId = 0;
    selectedEducatorId = 0;

    constructor(code: string, title: string, description: string, filenamePrefix: string, roles: string[], showChildrenList: boolean, showEducatorsList: boolean) {
        this.code = code;
        this.title = title;
        this.description = description;
        this.filenamePrefix = filenamePrefix;
        this.roles = roles;
        this.showChildrenList = showChildrenList;
        this.showEducatorsList = showEducatorsList;
    }
}
