import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ResultsComponent } from './results/results.component';
import { MainComponent } from './main/main.component';
import { RentalComponent } from './rental/rental.component';


const APP_ROUTES: Routes = [
    { path: '', component: MainComponent },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent},
    { path: 'search', component: ResultsComponent },
    { path: 'rental', component: RentalComponent }

];

export const routing = RouterModule.forRoot(APP_ROUTES);
export class AppRoutingModule { }
