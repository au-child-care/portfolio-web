import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ChildSelectorComponent } from './child-selector.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [CommonModule, RouterModule, NgbModule],
    declarations: [ChildSelectorComponent],
    exports: [ChildSelectorComponent]
})
export class ChildSelectorModule {}
