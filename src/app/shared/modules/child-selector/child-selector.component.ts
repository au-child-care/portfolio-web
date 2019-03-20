import {Component, OnInit, Input} from '@angular/core';
import { ChildService } from '../../services';
import { ChildSelection } from '../../dtos';

@Component({
  selector: 'app-child-selector',
  templateUrl: './child-selector.component.html'
})
export class ChildSelectorComponent implements OnInit {
    @Input() label: string;
    @Input() selectedIdsInput: number[];
    @Input() children: ChildSelection[];
    selectedCount: number;
    group1SelectedCount: number;
    group2SelectedCount: number;
    group3SelectedCount: number;
    group4SelectedCount: number;
    group5SelectedCount: number;
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
                this.selectedCount = this.selectedIdsInput.length;
                this.group1SelectedCount = this.childGroup1.filter(c => c.selected).length;
                this.group2SelectedCount = this.childGroup2.filter(c => c.selected).length;
                this.group3SelectedCount = this.childGroup3.filter(c => c.selected).length;
                this.group4SelectedCount = this.childGroup4.filter(c => c.selected).length;
                this.group5SelectedCount = this.childGroup5.filter(c => c.selected).length;
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

    onCheckChange(group: number, model: ChildSelection) {
        const addend = model.selected ? 1 : -1;
        this.selectedCount += addend;
        switch (group) {
            case 1: {
                this.group1SelectedCount += addend;
                break;
            }
            case 2: {
                this.group2SelectedCount += addend;
                break;
            }
            case 3: {
                this.group3SelectedCount += addend;
                break;
            }
            case 4: {
                this.group4SelectedCount += addend;
                break;
            }
            case 5: {
                this.group5SelectedCount += addend;
                break;
            }
         }
    }
}
