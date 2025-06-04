declare var google: any;
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProfileService } from '../../shared/services/profile.service';
import { IProfile } from '../../shared/models/shared/models/profile.interface';
import { AuthService } from '../../shared/services/auth.service';

const DEFAULT_AVATAR = 'https://occ-0-2590-2164.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABTZ2zlLdBVC05fsd2YQAR43J6vB1NAUBOOrxt7oaFATxMhtdzlNZ846H3D8TZzooe2-FT853YVYs8p001KVFYopWi4D4NXM.png?r=229';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black to-transparent p-4">
      <div class="container mx-auto flex items-center justify-between">
        <div class="flex items-center">
          <img src="assets/netflix-logo.png" alt="Netflix" class="h-8">
          <nav class="ml-8">
            <ul class="flex space-x-4">
              <li><a href="#" class="text-white hover:text-gray-300">Home</a></li>
              <li><a href="#" class="text-white hover:text-gray-300">TV Shows</a></li>
              <li><a href="#" class="text-white hover:text-gray-300">Movies</a></li>
              <li><a href="#" class="text-white hover:text-gray-300">New & Popular</a></li>
              <li><a href="#" class="text-white hover:text-gray-300">My List</a></li>
            </ul>
          </nav>
        </div>
        <div class="flex items-center space-x-4">
          <div class="relative group">
            <div class="flex items-center cursor-pointer">
              <img [src]="getProfileImage()" 
                   [alt]="currentProfile?.name || 'Profile'" 
                   class="w-8 h-8 rounded"
                   (error)="handleImageError($event)">
              <span class="ml-2 text-white">{{currentProfile?.name || 'Profile'}}</span>
            </div>
            <div class="absolute right-0 mt-2 w-48 bg-black bg-opacity-90 rounded shadow-lg hidden group-hover:block">
              <ul class="py-2">
                <li>
                  <a href="#" class="block px-4 py-2 text-white hover:bg-gray-800"
                     (click)="switchProfile()">Switch Profile</a>
                </li>
              </ul>
            </div>
          </div>
          <button (click)="signOut()" class="text-white hover:text-gray-300 ml-4">Sign Out</button>
        </div>
      </div>
    </header>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class HeaderComponent implements OnInit {
  currentProfile: IProfile | null = null;

  constructor(
    private profileService: ProfileService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.profileService.currentProfile$.subscribe(profile => {
      this.currentProfile = profile;
    });
  }

  getProfileImage(): string {
    return this.currentProfile?.avatar || DEFAULT_AVATAR;
  }

  handleImageError(event: any) {
    event.target.src = DEFAULT_AVATAR;
  }

  switchProfile() {
    this.router.navigate(['/profiles']);
  }

  signOut() {
    this.authService.signOut();
  }
} 