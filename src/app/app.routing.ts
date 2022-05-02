import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { UserGuard } from './guard/user.guard';
import { dashboard_content } from './routes/dashboard.router';
import { home_content } from './routes/home.router';
import { DashboardLayoutComponent } from './shared/layout/dashboard-layout/dashboard-layout.component';
import { HomeLayoutComponent } from './shared/layout/home-layout/home-layout.component';

export const routes: Routes = [

    // REDIRECTIONS //
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },
    // HOME //
    {
        path: 'home',
        component: HomeLayoutComponent,
        children: home_content, 
    },
    {
        path: 'dashboard',
        component: DashboardLayoutComponent,
        children: dashboard_content, 
        canActivate: [UserGuard]
    },
    { 
        path: '**', 
        component: HomeLayoutComponent 
    },
]

@NgModule({
    imports: [
        [
            RouterModule.forRoot(routes,{
                anchorScrolling: 'enabled',
                scrollPositionRestoration: 'enabled',
                preloadingStrategy: PreloadAllModules,
            })
        ]
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
