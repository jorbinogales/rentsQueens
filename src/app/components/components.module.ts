import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterModule } from './filter/filter.module';
import { CardModule } from './card/card.module';
import { NavbarComponent } from './navbar/navbar.component';
import { NavbarModule } from './navbar/navbar.module';
import { DepartamentComponent } from './departament/departament.component';
import { DepartamentModule } from './departament/departament.module';
import { LoadingModule } from './loading/loading.module';
@NgModule({
  imports: [
    FilterModule,
    CommonModule,
    NavbarModule,
    CardModule,
    DepartamentModule,
    LoadingModule,
  ], 
  exports:[ 
    FilterModule,
    CardModule,
    NavbarModule,
    DepartamentModule,
    LoadingModule,
  ],
})
export class ComponentsModule { }
