import {Component} from '@angular/core';
import { ChildService } from '../../services';
import { Child } from '../../dtos';

@Component({
  selector: 'app-child-selector',
  templateUrl: './child-selector.component.html'
})
export class ChildSelectorComponent {
    children: Child[];
    children1: Child[];
    children2: Child[];
    children3: Child[];
    children4: Child[];
    children5: Child[];

    constructor(
        private childService: ChildService) {
        }

    ngOnInit() {
        this.loadChildren();
    }

    loadChildren() {
        this.childService.getChildren()
            .subscribe(c => this.children = c);
        this.children1 = this.children.filter(c => c.group === 'Babies');
        this.children2 = this.children.filter(c => c.group === 'Senior Babies');
        this.children3 = this.children.filter(c => c.group === 'Toodlers');
        this.children4 = this.children.filter(c => c.group === 'Juniors');
        this.children5 = this.children.filter(c => c.group === 'Kinders');
    }
}
