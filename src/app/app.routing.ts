import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { UserGuard } from './guard/user.guard';
import { home_content } from './routes/home.router';
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
