import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardInitComponent } from './init/dashboard-init.component';
import { CreateApartamentComponent } from './create-apartament/create-apartament.component';
import { DashboardPagesRouting } from './dashboard-page.routing';
import { NavbarModule } from 'src/app/components/navbar/navbar.module';
import { CardModule } from 'src/app/components/card/card.module';
import { DepartamentModule } from 'src/app/components/departament/departament.module';
import { FilterModule } from 'src/app/components/filter/filter.module';
import { CreateApartamentService } from './create-apartament/create-apartament.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtInterceptorModule } from 'src/app/interceptor/jwt-interceptor.module';
import { LoadingModule } from 'src/app/components/loading/loading.module';
import { ImageCropperModule } from 'ngx-image-cropper';


@NgModule({
  declarations: [
    DashboardInitComponent,
    CreateApartamentComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NavbarModule,
    CardModule,
    FilterModule,
    LoadingModule,
    DepartamentModule,
    DashboardPagesRouting,
    JwtInterceptorModule,
    ImageCropperModule,
  ],
  providers:[
    CreateApartamentService,
  ]
})
export class DashboardPagesModule { }
