import { RegisterComponent } from './../register/register.component';
import { DashboardComponent } from './../dashboard/dashboard.component';

export const ROUTES = [
    { path: '', redirectTo: 'auth/register', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent},
    { path: 'auth/register', component: RegisterComponent},
];

