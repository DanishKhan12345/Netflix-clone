import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { profileGuard } from './core/guards/profile.guard';

export const routes: Routes = [
  {path: '', loadComponent: () => import('./NetflixComponents/login/login.component').then(m => m.LoginComponent) },
  {path: 'browse', loadComponent: () => import('./NetflixComponents/browse/browse.component').then(m => m.BrowseComponent)},
  {path: 'profiles', loadComponent: () => import('./shared/components/profile-selector/profile-selector.component').then(m => m.ProfileSelectorComponent) },
  {
    path: '**',
    redirectTo: 'login'
  }
];
