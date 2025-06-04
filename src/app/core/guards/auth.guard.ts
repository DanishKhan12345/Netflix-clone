import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

export const authGuard = () => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);
  
  if (!isPlatformBrowser(platformId)) {
    return true; // Allow during SSR
  }
  
  const userData = sessionStorage.getItem('LoggedInUser');
  
  if (!userData) {
    router.navigate(['/login']);
    return false;
  }
  return true;
}; 