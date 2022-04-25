import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartamentComponent } from './departament.component';

@NgModule({
    declarations: [
        DepartamentComponent,
    ],
    imports: [
        CommonModule,
    ],
    exports: [
        DepartamentComponent,
    ]
})
export class DepartamentModule { }