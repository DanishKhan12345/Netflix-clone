import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProfileService } from '../../services/profile.service';
import { IProfile } from '../../models/shared/models/profile.interface';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

const DEFAULT_AVATAR = 'https://occ-0-2590-2164.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABTZ2zlLdBVC05fsd2YQAR43J6vB1NAUBOOrxt7oaFATxMhtdzlNZ846H3D8TZzooe2-FT853YVYs8p001KVFYopWi4D4NXM.png?r=229';

@Component({
  selector: 'app-profile-selector',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      <h1 class="text-4xl font-bold mb-12">Who's watching?</h1>
      
      <div class="grid grid-cols-2 gap-8 max-w-[600px]">
        <!-- Existing Profiles -->
        <div *ngFor="let profile of profiles$ | async" 
             class="flex flex-col items-center cursor-pointer group relative"
             (click)="selectProfile(profile)">
          <div class="w-32 h-32 rounded-md overflow-hidden mb-4 group-hover:border-2 group-hover:border-white relative">
            <img [src]="profile.avatar || DEFAULT_AVATAR" 
                 [alt]="profile.name" 
                 class="w-full h-full object-cover"
                 (error)="handleImageError($event)">
            <button 
              class="absolute top-0 right-0 bg-red-600 text-white p-1 rounded-bl opacity-0 group-hover:opacity-100 transition-opacity"
              (click)="deleteProfileHandler($event, profile)">
              <span class="text-sm">✕</span>
            </button>
          </div>
          <span class="text-gray-400 group-hover:text-white">{{profile.name}}</span>
        </div>

        <!-- Add Profile Button -->
        <ng-container *ngIf="(profiles$ | async) as profiles">
          <div *ngIf="profiles.length < 4" 
               class="flex flex-col items-center cursor-pointer group"
               (click)="showAddProfile = true">
            <div class="w-32 h-32 rounded-md overflow-hidden mb-4 bg-[#141414] flex items-center justify-center group-hover:border-2 group-hover:border-white">
              <span class="text-6xl text-gray-400 group-hover:text-white">+</span>
            </div>
            <span class="text-gray-400 group-hover:text-white">Add Profile</span>
          </div>
        </ng-container>
      </div>

      <!-- Add Profile Modal -->
      <div *ngIf="showAddProfile" class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
        <div class="bg-[#141414] p-8 rounded-lg w-96">
          <h2 class="text-2xl font-bold mb-4">Add Profile</h2>
          <form (ngSubmit)="createProfile()" #profileForm="ngForm">
            <div class="mb-4">
              <label class="block text-gray-400 mb-2">Name</label>
              <input type="text" [(ngModel)]="newProfile.name" name="name" required
                     class="w-full bg-gray-800 text-white p-2 rounded">
            </div>
            <div class="mb-4">
              <label class="block text-gray-400 mb-2">Kids Profile</label>
              <div class="flex items-center">
                <input type="checkbox" [(ngModel)]="newProfile.isKids" name="isKids"
                       class="mr-2 w-4 h-4">
                <span class="text-gray-400">Make this a kids profile</span>
              </div>
            </div>
            <div class="flex justify-end gap-4 mt-8">
              <button type="button" (click)="showAddProfile = false"
                      class="px-4 py-2 text-gray-400 hover:text-white">
                Cancel
              </button>
              <button type="submit" [disabled]="!profileForm.form.valid"
                      class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50">
                Create
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Delete Profile Confirmation Modal -->
      <div *ngIf="showDeleteConfirmation" class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
        <div class="bg-[#141414] p-8 rounded-lg w-96">
          <h2 class="text-2xl font-bold mb-4">Delete Profile</h2>
          <p class="text-gray-400 mb-6">Are you sure you want to delete this profile? This action cannot be undone.</p>
          <div class="flex justify-end gap-4">
            <button (click)="showDeleteConfirmation = false"
                    class="px-4 py-2 text-gray-400 hover:text-white">
              Cancel
            </button>
            <button (click)="confirmDeleteProfile()"
                    class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
              Delete Profile
            </button>
          </div>
        </div>
      </div>

      <!-- PIN Entry Modal -->
      <div *ngIf="showPinEntry" class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
        <div class="bg-[#141414] p-8 rounded-lg w-96">
          <h2 class="text-2xl font-bold mb-4">Enter PIN</h2>
          <form (ngSubmit)="verifyPin()" #pinForm="ngForm">
            <div class="mb-4">
              <input type="password" [(ngModel)]="pin" name="pin" required
                     class="w-full bg-gray-800 text-white p-2 rounded text-center"
                     maxlength="4" pattern="[0-9]*"
                     placeholder="Enter 4-digit PIN">
            </div>
            <div class="flex justify-end gap-4">
              <button type="button" (click)="showPinEntry = false"
                      class="px-4 py-2 text-gray-400 hover:text-white">
                Cancel
              </button>
              <button type="submit" [disabled]="!pinForm.form.valid"
                      class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50">
                Enter
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      min-height: 100vh;
      background-color: black;
    }
  `]
})
export class ProfileSelectorComponent implements OnInit {
  profiles$: Observable<IProfile[]>;
  showAddProfile = false;
  showPinEntry = false;
  selectedProfile: IProfile | null = null;
  pin = '';
  DEFAULT_AVATAR = DEFAULT_AVATAR;
  showDeleteConfirmation = false;
  profileToDelete: IProfile | null = null;

  newProfile = {
    name: '',
    avatar: DEFAULT_AVATAR,
    isKids: false,
    isLocked: false,
    preferences: {
      language: 'en-US',
      autoplay: true,
      contentRestrictions: []
    },
    watchHistory: []
  };

  constructor(
    private profileService: ProfileService,
    private router: Router
  ) {
    this.profiles$ = this.profileService.profiles$;
  }

  ngOnInit() {
    const currentProfile = this.profileService.getCurrentProfile();
    if (currentProfile) {
      this.router.navigate(['/browse']);
    }
  }

  handleImageError(event: any) {
    event.target.src = DEFAULT_AVATAR;
  }

  selectProfile(profile: IProfile) {
    if (profile.isLocked) {
      this.selectedProfile = profile;
      this.showPinEntry = true;
    } else {
      this.profileService.setCurrentProfile(profile);
      this.router.navigate(['/browse']);
    }
  }

  createProfile() {
    const userData = JSON.parse(sessionStorage.getItem('LoggedInUser')!);
    const profile = this.profileService.createProfile({
      ...this.newProfile,
      userId: userData.email
    });
    
    this.showAddProfile = false;
    this.newProfile = {
      name: '',
      avatar: DEFAULT_AVATAR,
      isKids: false,
      isLocked: false,
      preferences: {
        language: 'en-US',
        autoplay: true,
        contentRestrictions: []
      },
      watchHistory: []
    };
  }

  verifyPin() {
    if (this.selectedProfile && this.profileService.verifyPin(this.selectedProfile.id, this.pin)) {
      this.profileService.setCurrentProfile(this.selectedProfile);
      this.showPinEntry = false;
      this.router.navigate(['/browse']);
    } else {
      // Show error message
      alert('Invalid PIN');
    }
    this.pin = '';
  }

  deleteProfileHandler(event: Event, profile: IProfile) {
    event.stopPropagation();
    this.profileToDelete = profile;
    this.showDeleteConfirmation = true;
  }

  confirmDeleteProfile() {
    if (this.profileToDelete) {
      this.profileService.deleteProfile(this.profileToDelete.id);
      this.showDeleteConfirmation = false;
      this.profileToDelete = null;
    }
  }
} 