import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoadingModule } from '../loading/loading.module';

@NgModule({
    declarations: [
        NavbarComponent
    ],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        HttpClientModule,
        LoadingModule,
    ],
    exports: [
        NavbarComponent,
    ]
})
export class NavbarModule { }