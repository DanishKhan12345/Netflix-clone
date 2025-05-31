import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../core/components/header/header.component';
import { BannerComponent } from '../../core/components/banner/banner.component';
import { MoviesService } from '../../shared/services/movies.service';
import { MovieCarouselComponent } from '../../shared/components/movie-carousel/movie-carousel.component';
import { IMovieContent } from '../../shared/models/shared/models/movie.interface';
import { forkJoin, map } from 'rxjs';
@Component({
  selector: 'app-browse',
  imports: [CommonModule, HeaderComponent,BannerComponent,MovieCarouselComponent],
  templateUrl: './browse.component.html',
  styleUrl: './browse.component.css'
})
export class BrowseComponent implements OnInit{
  
  authservice = inject(AuthService);
  moviesService = inject(MoviesService);
  name:any;
  userProfileImage:any;
  email:any;
  
  movieContents: IMovieContent[] = [];
  movies: IMovieContent[] = [];
  tvShows: IMovieContent[] = [];
  ratedMovies: IMovieContent[] = [];
  nowPlayingMovies: IMovieContent[] = [];
  popularMovies: IMovieContent[] = [];
  topRatedMovies: IMovieContent[] = [];
  upcomingMovies: IMovieContent[] = [];

  
sources = 
[
  this.moviesService.getMovies(),
  this.moviesService.getTvShows(),
  // this.moviesService.getRatedMovies(),
  this.moviesService.getBannerImage(),
  this.moviesService.getBannerVideo(),
  this.moviesService.getBannerDetail(),
  this.moviesService.getNowPlayingMovies(),
  
]

  ngOnInit(): void {

    this.name = JSON.parse(sessionStorage.getItem('LoggedInUser')!).name;
    this.userProfileImage = JSON.parse(sessionStorage.getItem('LoggedInUser')!).picture;
    this.email = JSON.parse(sessionStorage.getItem('LoggedInUser')!).email;

    forkJoin(this.sources)
    .pipe(
      map(([movies, tvShows,nowPlaying, upcoming, popular, topRated])=>{
        // this.bannerDetail$ = this.moviesService.getBannerDetail(movies.results[1].id);
        // this.bannerVideo$ = this.moviesService.getBannerVideo(movies.results[1].id);
        return {movies, tvShows,nowPlaying, upcoming, popular, topRated}
      })
    ).subscribe((res:any)=>{
      this.movies = res.movies.results as IMovieContent[];
      this.tvShows = res.tvShows.results as IMovieContent[];
      // this.ratedMovies = res.ratedMovies.results as IMovieContent[];
      this.nowPlayingMovies = res.nowPlaying.results as IMovieContent[];
      this.upcomingMovies = res.upcoming.results as IMovieContent[];
      this.popularMovies = res.popular.results as IMovieContent[];
      this.topRatedMovies = res.topRated.results as IMovieContent[];
      // this.getMovieKey();
      // debugger;
      // console.log(res.nowPlaying);
    })


    // this.moviesService.getMovies().subscribe((res)=>{
    //   console.log(res);
    //   this.movieContents = res.results;
    // })

    
  }

  signOut() {
    this.authservice.signOut();
  }
}
