import {Component, OnInit, Input} from '@angular/core';
import { ChildService } from '../../services';
import { ChildSelection } from '../../dtos';

@Component({
  selector: 'app-child-selector',
  templateUrl: './child-selector.component.html'
})
export class ChildSelectorComponent implements OnInit {
    @Input() selectedIdsInput: number[];
    @Input() children: ChildSelection[];
    childGroup1: ChildSelection[];
    childGroup2: ChildSelection[];
    childGroup3: ChildSelection[];
    childGroup4: ChildSelection[];
    childGroup5: ChildSelection[];

    constructor(
        private childService: ChildService) {
        }

    ngOnInit() {
        this.loadChildren();
    }

    loadChildren() {
        this.childService.getChildren()
            .subscribe(children => {
                this.children = children .map(cg =>
                    new ChildSelection(
                        cg.id,
                        cg.first_name + ' ' + cg.last_name,
                        cg.group,
                        this.selectedIdsInput && this.selectedIdsInput.indexOf(cg.id) > -1));
                this.childGroup1 = this.getFilteredAndSortedChilden('Babies');
                this.childGroup2 = this.getFilteredAndSortedChilden('Senior Babies');
                this.childGroup3 = this.getFilteredAndSortedChilden('Toddlers');
                this.childGroup4 = this.getFilteredAndSortedChilden('Juniors');
                this.childGroup5 = this.getFilteredAndSortedChilden('Kinders');
                });
    }

    getFilteredAndSortedChilden(group: string): ChildSelection[] {
        return this.children.filter(c => c.group === group).sort((obj1, obj2) => {
            if (obj1.name > obj2.name) {
                return 1;
            }
            if (obj1.name < obj2.name) {
                return -1;
            }
            return 0;
        });
    }
}
