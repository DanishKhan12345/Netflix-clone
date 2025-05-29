import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../core/components/header/header.component';
import { BannerComponent } from '../../core/components/banner/banner.component';
import { MoviesService } from '../../shared/services/movies.service';
import { MovieCarouselComponent } from '../../shared/components/movie-carousel/movie-carousel.component';
import { IMovieContent } from '../../shared/models/shared/models/movie.interface';
@Component({
  selector: 'app-browse',
  imports: [CommonModule, HeaderComponent,BannerComponent,MovieCarouselComponent],
  templateUrl: './browse.component.html',
  styleUrl: './browse.component.css'
})
export class BrowseComponent implements OnInit{
  
  authservice = inject(AuthService);
  moviesService = inject(MoviesService);
  name = JSON.parse(sessionStorage.getItem('LoggedInUser')!).name;
  userProfileImage = JSON.parse(sessionStorage.getItem('LoggedInUser')!).picture;
  email = JSON.parse(sessionStorage.getItem('LoggedInUser')!).email;
  movieContents: IMovieContent[] = [];
  ngOnInit(): void {
    this.moviesService.getMovies().subscribe((res)=>{
      console.log(res);
      this.movieContents = res.results;
    })
  }

  signOut() {
    this.authservice.signOut();
  }
}
