import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [
        NavbarComponent
    ],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        HttpClientModule,
    ],
    exports: [
        NavbarComponent,
    ]
})
export class NavbarModule { }