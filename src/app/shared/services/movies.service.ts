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

}
