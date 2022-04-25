import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { NavbarModule } from 'src/app/components/navbar/navbar.module';
import { CardModule } from 'src/app/components/card/card.module';
import { FilterModule } from 'src/app/components/filter/filter.module';
import { DepartamentModule } from 'src/app/components/departament/departament.module';


@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonModule,
    NavbarModule,
    CardModule,
    FilterModule,
    DepartamentModule,
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
