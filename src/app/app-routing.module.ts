import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResultsComponent } from './results/results.component';


const APP_ROUTES: Routes = [
    // { path: 'auth', component: AuthenticationComponent, children: AUTH_ROUTES }
    { path: 'results', component: ResultsComponent }
];

export const routing = RouterModule.forRoot(APP_ROUTES);
export class AppRoutingModule { }
