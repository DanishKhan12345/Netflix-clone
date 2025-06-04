import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IProfile } from '../models/shared/models/profile.interface';
import { isPlatformBrowser } from '@angular/common';

const DEFAULT_AVATAR = 'https://occ-0-2590-2164.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABTZ2zlLdBVC05fsd2YQAR43J6vB1NAUBOOrxt7oaFATxMhtdzlNZ846H3D8TZzooe2-FT853YVYs8p001KVFYopWi4D4NXM.png?r=229';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private profilesSubject = new BehaviorSubject<IProfile[]>([]);
  private currentProfileSubject = new BehaviorSubject<IProfile | null>(null);
  private isBrowser: boolean;

  profiles$ = this.profilesSubject.asObservable();
  currentProfile$ = this.currentProfileSubject.asObservable();

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
    if (this.isBrowser) {
      this.loadProfiles();
    }
  }

  private loadProfiles() {
    try {
      if (!this.isBrowser) return;
      
      const userData = sessionStorage.getItem('LoggedInUser');
      if (!userData) return;

      const parsedUserData = JSON.parse(userData);
      if (parsedUserData) {
        const profiles = JSON.parse(localStorage.getItem(`profiles_${parsedUserData.email}`) || '[]');
        this.profilesSubject.next(profiles);
      }
    } catch (error) {
      console.error('Error loading profiles:', error);
      // Initialize with empty profiles array on error
      this.profilesSubject.next([]);
    }
  }

  private saveProfiles(profiles: IProfile[]) {
    try {
      if (!this.isBrowser) return;
      
      const userData = sessionStorage.getItem('LoggedInUser');
      if (!userData) return;

      const parsedUserData = JSON.parse(userData);
      if (parsedUserData) {
        localStorage.setItem(`profiles_${parsedUserData.email}`, JSON.stringify(profiles));
        this.profilesSubject.next(profiles);
      }
    } catch (error) {
      console.error('Error saving profiles:', error);
    }
  }

  createProfile(profile: Omit<IProfile, 'id'>): IProfile {
    const profiles = this.profilesSubject.value;
    const newProfile: IProfile = {
      ...profile,
      id: Date.now().toString(),
      avatar: DEFAULT_AVATAR
    };
    this.saveProfiles([...profiles, newProfile]);
    return newProfile;
  }

  updateProfile(profile: IProfile): void {
    const profiles = this.profilesSubject.value;
    const index = profiles.findIndex(p => p.id === profile.id);
    if (index !== -1) {
      profiles[index] = profile;
      this.saveProfiles(profiles);
    }
  }

  deleteProfile(profileId: string): void {
    const profiles = this.profilesSubject.value;
    this.saveProfiles(profiles.filter(p => p.id !== profileId));
  }

  setCurrentProfile(profile: IProfile | null): void {
    this.currentProfileSubject.next(profile);
  }

  getCurrentProfile(): IProfile | null {
    return this.currentProfileSubject.value;
  }

  verifyPin(profileId: string, pin: string): boolean {
    const profile = this.profilesSubject.value.find(p => p.id === profileId);
    return profile?.pin === pin;
  }
} 