import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators'
import { Http, Headers, RequestOptions } from "@angular/http"
import { Observable, timer } from 'rxjs'


@Injectable({
  providedIn: 'root'
})
export class ServerService {
  activeScreen = "SHOW_MOVIES"
  currentMovieId = null
  movies = []
  constructor(private http:Http) { 
    this.activeScreen = "SHOW_MOVIES"
  }

  getCurrentMovieId() {
    return this.currentMovieId
  }

  setCurrentMovieId(movieId) {
    this.currentMovieId = movieId
  }

  getMovie(movieId) {
    return new Observable(observer => {
      this.get("/movie/" + movieId).subscribe((resp) => {
        let movie
        if (resp["status"] == "SUCCESS") {
          movie = resp["movieDetail"]
        } else {
          movie = null
        }
        observer.next(movie)
      })
    })
  }

  createMovie(movie: any){
    let headers = new Headers()
    headers.append('Content-Type', 'application/json')
    let options = new RequestOptions({ headers: headers })
    return this.http.post('/movie', movie, options).pipe(
      map(res => res.json()))
  }

  getMovies() {
    return new Observable(observer => {
      this.get("/movies").subscribe((resp) => {
        if (resp["status"] == "SUCCESS") {
          this.movies = resp["movies"]
        } else {
          this.movies = []
        }
        observer.next(this.movies)
      })
    })
  }

  get(url: string, data = {}) {
    return this.http.get(url, data).pipe(
      map(res => res.json()))
  }
}
