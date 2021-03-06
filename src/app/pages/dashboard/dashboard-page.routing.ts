import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateApartamentComponent } from './create-apartament/create-apartament.component';
import {
  CreateApartamentResolver,
  GetApartamentResolve,
} from './create-apartament/create-apartament.resolver';
import { DashboardInitComponent } from './init/dashboard-init.component';
import { DashboardInitResolver } from './init/dashboard-init.resolver';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: DashboardInitComponent,
        resolve: {
          apartaments: DashboardInitResolver,
        },
      },
      {
        path: 'create-apartament',
        component: CreateApartamentComponent,
        resolve: {
          trains: CreateApartamentResolver,
        },
      },
      {
        path: 'edit-apartament/:id',
        component: CreateApartamentComponent,
        resolve: {
          apartament: GetApartamentResolve,
        },
      },
    ],
  },
  {
    path: 'page/:page',
    component: DashboardInitComponent,
    resolve: {
      apartaments: DashboardInitResolver,
    },
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardPagesRouting {}
