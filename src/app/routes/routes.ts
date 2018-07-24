import { ProfileComponent } from '../profile/profile.component';
import { RegisterComponent } from '../register/register.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { LoginComponent } from '../login/login.component';
import { AuthGuard } from '../guards/auth.guard';
import { AuthedGuard } from '../guards/authed.guard';
import { WallComponent } from '../profile/wall/wall.component';
import { EditProfileComponent } from '../profile/edit-profile/edit-profile.component';
import { CreateJokeComponent } from '../create-joke/create-joke.component';

export const ROUTES = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'auth/register', component: RegisterComponent ,canActivate: [AuthedGuard]},
    { path: 'auth/login', component: LoginComponent, canActivate: [AuthedGuard]},
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
    { path: 'user/profile/:id', component: ProfileComponent, canActivate: [AuthGuard], 
        children: [
            //  when visiting profile the wall component will be displayed by default 
            { path: '', component: WallComponent},
            { path: 'edit', component: EditProfileComponent}
        ]
    },
    { path: 'create/joke', component: CreateJokeComponent},
];

