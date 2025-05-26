import { Component, inject } from '@angular/core';
import { AuthService } from '../auth.service';
import { json } from 'stream/consumers';
@Component({
  selector: 'app-browse',
  imports: [],
  templateUrl: './browse.component.html',
  styleUrl: './browse.component.css'
})
export class BrowseComponent {
  name = JSON.parse(sessionStorage.getItem('LoggedInUser')!).name;
  userProfileImage = JSON.parse(sessionStorage.getItem('LoggedInUser')!).picture;
  email = JSON.parse(sessionStorage.getItem('LoggedInUser')!).email;
  authservice = inject(AuthService);

  signOut() {
    this.authservice.signOut();
  }
}
