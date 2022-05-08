import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePagesRounting } from './home-page.routing';
import { HomeInitComponent } from './init/home-init.component';
import { CardModule } from 'src/app/components/card/card.module';
import { FilterModule } from 'src/app/components/filter/filter.module';
import { DepartamentModule } from 'src/app/components/departament/departament.module'
import { HomeDepartamentComponent } from './departament/departament.component';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    HomeInitComponent,
    HomeDepartamentComponent,
  ],
  imports: [
    NgxPaginationModule,
    CommonModule,
    CardModule,
    FilterModule,
    DepartamentModule,
    HomePagesRounting,
  ],
})
export class HomePagesModule { }
