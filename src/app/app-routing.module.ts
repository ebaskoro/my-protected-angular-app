import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OAuthModule } from 'angular-oauth2-oidc';

import { DashboardComponent } from './dashboard.component';
import { HeroesComponent } from './heroes.component';
import { HeroDetailComponent } from './hero-detail.component';

import { AuthGuard } from './auth.guard';


// Collection of routes
const routes: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [
            AuthGuard
        ]
    },
    {
        path: 'heroes',
        component: HeroesComponent,
        canActivate: [
            AuthGuard
        ]
    },
    {
        path: 'hero/:id',
        component: HeroDetailComponent,
        canActivate: [
            AuthGuard
        ]
    }
];


/**
 * App routing module.
 *
 */
@NgModule({
    imports: [
        RouterModule.forRoot(routes),
        OAuthModule.forRoot()
    ],
    providers: [
        AuthGuard
    ],
    exports: [
        RouterModule,
        OAuthModule
    ]
})
export class AppRoutingModule {
}
