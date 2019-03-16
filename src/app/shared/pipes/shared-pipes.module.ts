import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { YesNoPipe } from './yes-no.pipe';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        YesNoPipe
    ],
    exports: [
        YesNoPipe
    ]
})
export class SharedPipesModule { }
