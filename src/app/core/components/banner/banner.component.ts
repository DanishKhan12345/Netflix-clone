import { Component, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnChanges {
  
  @Input({required: true}) bannerTitle  : string = '';
  @Input({required: true}) bannerOverview: string = '';
  @Input() bannerVideo: any = 'fsQgc9pCyDU';
  private sanitizer = inject(DomSanitizer);
  videoUrl: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
    `https://www.youtube.com/embed/${this.bannerVideo}?autoplay=1&mute=1&loop=1&controls=0&playlist=${this.bannerVideo}`);

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['bannerVideo']){
      this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
        `https://www.youtube.com/embed/${this.bannerVideo}?autoplay=1&mute=1&loop=1&controls=0&playlist=${this.bannerVideo}`);

    }
  }

  playVideo() {
    // Implement play functionality
    console.log('Playing video...');
  }

  moreInfo() {
    // Implement more info functionality
    console.log('Showing more info...');
  }
}
 