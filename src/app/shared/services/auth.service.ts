declare var google: any;
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  router = inject(Router);
  constructor() { }
  signOut() {
    // google.accounts.id.revoke(sessionStorage.getItem('LoggedInUser')?.credential);
    sessionStorage.removeItem('LoggedInUser');
    google.accounts.id.disableAutoSelect();
    this.router.navigate(['/']);
  }
}
