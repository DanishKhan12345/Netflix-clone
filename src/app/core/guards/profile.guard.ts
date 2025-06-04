import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from '../../shared/services/profile.service';

export const profileGuard = () => {
  const profileService = inject(ProfileService);
  const router = inject(Router);
  
  const currentProfile = profileService.getCurrentProfile();
  if (!currentProfile) {
    router.navigate(['/profiles']);
    return false;
  }
  return true;
}; 