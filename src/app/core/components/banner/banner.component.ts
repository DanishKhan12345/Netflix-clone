import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {
  // featuredContent = {
  //   title: 'Stranger Things',
  //   description: 'When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl.',
  //   backgroundImage: 'https://image.tmdb.org/t/p/original/56v2KjBlU4XaOv9rVYEQypROD7P.jpg'
  // };

  ngOnInit() {
    // In a real application, you would fetch this data from a service
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
 