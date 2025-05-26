import { Component, inject } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../core/components/header/header.component';
import { BannerComponent } from '../../core/components/banner/banner.component';
@Component({
  selector: 'app-browse',
  imports: [CommonModule, HeaderComponent,BannerComponent],
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
