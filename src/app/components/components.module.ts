import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterModule } from './filter/filter.module';
import { CardModule } from './card/card.module';
import { NavbarComponent } from './navbar/navbar.component';
import { NavbarModule } from './navbar/navbar.module';
import { DepartamentComponent } from './departament/departament.component';
import { DepartamentModule } from './departament/departament.module';
@NgModule({
  imports: [
    FilterModule,
    CommonModule,
    NavbarModule,
    CardModule,
    DepartamentModule,
  ], 
  exports:[ 
    FilterModule,
    CardModule,
    NavbarModule,
    DepartamentModule,
  ],
})
export class ComponentsModule { }
