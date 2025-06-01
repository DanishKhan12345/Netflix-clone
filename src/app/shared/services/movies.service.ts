import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

const options = {
  params:{
    include_adult: 'false',
    include_video: 'ture',
    language: 'en-US',
    page: '1',
    sort_by: 'popularity.desc',
  },
  headers: {
		accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMTIwMmJmMjljODYzYWIyYjUzZWJmN2NjYjI4MmNkYSIsIm5iZiI6MTc0ODQ1MDI2Ni4xMjEsInN1YiI6IjY4MzczYmRhMjI2ZDhiMmU4NjJiODI2NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nFbP6LAFJOgWRzZ65Hhwh3FMjBjtNj3DrsRAmkheLiw'
	}
}

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  http = inject(HttpClient);
  
getMovies(){
  return this.http.get<any>('https://api.themoviedb.org/3/discover/movie', options);
}

getTvShows() {
  return this.http.get('https://api.themoviedb.org/3/discover/tv', options)
}

// getRatedMovies() {
//   return this.http.get('https://api.themoviedb.org/3/guest_session/guest_session_id/rated/movies', options)
// }

// getBannerImage(id: number) {
//   return this.http.get(`https://api.themoviedb.org/3/movie/${id}/images`, options)
// }

getBannerImage() {
  return this.http.get(`https://api.themoviedb.org/3/movie/157336/images`, options)
}

getBannerVideo(id: number) {
  return this.http.get(`https://api.themoviedb.org/3/movie/${id}/videos`, options);
}

  getBannerDetail(id: number) {
    return this.http.get(`https://api.themoviedb.org/3/movie/${id}`, options);
  }

// getBannerDetail() {
//   return this.http.get(`https://api.themoviedb.org/3/movie/157336`, options);
// }

// getBannerVideo() {
//   return this.http.get(`https://api.themoviedb.org/3/movie/157336/videos`, options);
// }

getNowPlayingMovies() {
  return this.http.get('https://api.themoviedb.org/3/movie/now_playing', options)
}

getPopularMovies() {
  return this.http.get('https://api.themoviedb.org/3/movie/popular', options)
}

getTopRated() {
  return this.http.get('https://api.themoviedb.org/3/movie/top_rated', options)
}

getUpcomingMovies() {
  return this.http.get('https://api.themoviedb.org/3/movie/upcoming', options)
}

}
