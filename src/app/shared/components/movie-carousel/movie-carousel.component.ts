import { NgFor, NgForOf, NgIf } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import Swiper from 'swiper';
import { IMovieContent } from '../../models/shared/models/movie.interface';
import { DescriptionPipe } from '../../pipes/description.pipe';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-movie-carousel',
  templateUrl: './movie-carousel.component.html',
  styleUrls: ['./movie-carousel.component.scss'],
  standalone: true,
  imports: [NgFor,DescriptionPipe,NgIf],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate(300, style({ opacity: 1 }))
      ])
    ])
  ]
})
export class MovieCarouselComponent implements OnInit, AfterViewInit {
  @Input() movieContents: IMovieContent[] = [];
  @Input() title!: string;
  @ViewChild('swiperContainer') swiperContainer!: ElementRef;
  selectedContent: string | null = null;
  constructor() { }
  ngAfterViewInit(): void {
   this.initSwiper();
  }

  ngOnInit() {
  }

  private initSwiper() {
    return new Swiper(this.swiperContainer.nativeElement, {
      slidesPerView: 3,
      slidesPerGroup: 2,
      centeredSlides: true,
      loop: true,
      breakpoints: {
        600: {
          slidesPerView: 2,
          slidesPerGroup: 2,
          spaceBetween: 5,
          centeredSlides: true,
        },
        900: {
          slidesPerView: 3,
          slidesPerGroup: 3,
          spaceBetween: 5,
          centeredSlides: true,
        },
        1200: {
          slidesPerView: 4,
          slidesPerGroup: 4,
          spaceBetween: 5,
          centeredSlides: false,
        },
        1500: {
          slidesPerView: 5,
          slidesPerGroup: 5,
          spaceBetween: 5,
          centeredSlides: false,
        },
        1800: {
          slidesPerView: 5,
          slidesPerGroup: 6,
          spaceBetween: 5,
          centeredSlides: false,
        }
      }
    })
  }

  setHoverMovie(movie: IMovieContent) {
    this.selectedContent = movie.title ?? movie.name;
  }

  clearHoverMovie() {
    this.selectedContent = null;
  }
}