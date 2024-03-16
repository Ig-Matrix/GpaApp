import { Routes } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { PortfolioPageComponent } from './pages/portfolio-page/portfolio-page.component';

export const routes: Routes = [
    {path:'', title:'Home', component:LandingPageComponent},
    {path:'portfolio', title:'portfolio', component:PortfolioPageComponent},
];
