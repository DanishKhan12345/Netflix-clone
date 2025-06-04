import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProfileService } from '../../../shared/services/profile.service';
import { IProfile } from '../../../shared/models/shared/models/profile.interface';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  @Input({required : true}) userImg : string = "";
  navList = [ "Home", "TV Shows", "Movies", "My List", "Browse by Languages", "News & Popular"];
  currentProfile: IProfile | null = null;
  showProfileMenu = false;

  constructor(
    private profileService: ProfileService,
    private router: Router
  ) {}

  ngOnInit() {
    this.profileService.currentProfile$.subscribe((profile: IProfile | null) => {
      this.currentProfile = profile;
    });
  }

  toggleProfileMenu() {
    this.showProfileMenu = !this.showProfileMenu;
  }

  switchProfile() {
    this.profileService.setCurrentProfile(null);
    this.router.navigate(['/profiles']);
  }

  signOut() {
    this.profileService.setCurrentProfile(null);
    // Call your existing signOut method
  }
}
