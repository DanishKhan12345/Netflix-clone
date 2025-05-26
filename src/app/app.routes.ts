import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: '', loadComponent: () => import('./NetflixComponents/login/login.component').then(m => m.LoginComponent) },
    {path: 'browse', loadComponent: () => import('./NetflixComponents/browse/browse.component').then(m => m.BrowseComponent) }
];
