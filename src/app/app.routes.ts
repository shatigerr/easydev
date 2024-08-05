import { Routes } from '@angular/router';
import { LoginComponent } from './core/components/login/login.component';
import { SignupComponent } from './core/components/signup/signup.component';
import { ProjectsComponent } from './core/components/projects/projects.component';
import { ProjectDetailsComponent } from './core/components/project-details/project-details.component';
import { DocsComponent } from './core/components/docs/docs.component';
import { AccountActivationComponent } from './core/components/account-activation/account-activation.component';


export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'projects/:id', component: ProjectsComponent },
    { path: 'projects/:id/:projectid', component: ProjectDetailsComponent },
    { path: 'docs',component:DocsComponent},
    { path: 'account',component:AccountActivationComponent},
    { path: '**', redirectTo: 'login' }
    
];
