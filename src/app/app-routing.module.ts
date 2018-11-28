import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResultsComponent } from './results/results.component';
import { MainComponent } from './main/main.component'


const APP_ROUTES: Routes = [
    // { path: 'auth', component: AuthenticationComponent, children: AUTH_ROUTES }
    { path: '', component: MainComponent },
    { path: 'homeaway/search', component: ResultsComponent }
];

export const routing = RouterModule.forRoot(APP_ROUTES);
export class AppRoutingModule { }
