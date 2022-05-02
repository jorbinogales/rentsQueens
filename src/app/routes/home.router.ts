import { Routes } from '@angular/router';

export const home_content: Routes = [
  { 
    path: '',
    loadChildren: () => import('./../pages/home/home-page.module').then(m => m.HomePagesModule )
  },
]