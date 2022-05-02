import { Routes } from '@angular/router';

export const dashboard_content: Routes = [
  { 
    path: '',
    loadChildren: () => import('./../pages/dashboard/dashboard-page.module').then(m => m.DashboardPagesModule )
  },
]