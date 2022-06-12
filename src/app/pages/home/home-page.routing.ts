import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeDepartamentComponent } from './departament/departament.component';
import { HomeDepartamentResolver } from './departament/departament.resolver';
import { HomeInitComponent } from './init/home-init.component';
import { HomeInitResolver } from './init/home-init.resolver';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: HomeInitComponent,
        resolve: {
          apartaments: HomeInitResolver,
        },
      },
      {
        path: ':id',
        component: HomeDepartamentComponent,
        resolve: {
          apartament: HomeDepartamentResolver,
        },
      },
    ],
  },
  {
    path: 'page/:page',
    component: HomeInitComponent,
    resolve: {
      apartaments: HomeInitResolver,
    },
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePagesRounting {}
