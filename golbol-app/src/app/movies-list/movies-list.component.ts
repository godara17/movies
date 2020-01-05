import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import { ServerService } from './../server.service'

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css']
  // providers:[ServerService]
})
export class MoviesListComponent implements OnInit {
  movies: any = []
  constructor(
    public router:Router, 
    private serverService: ServerService
  ) {

    this.serverService.getMovies().subscribe((movies) => {
      // this.showLoader = true
      if (!movies) this.movies = []
      else this.movies = movies 
    })
  }

  ngOnInit() {
  }


  getMovieDetails(event) {
    let movieId = event.target.id
    this.serverService.setCurrentMovieId(movieId)
    this.router.navigate(['movie/details'])
  }
}
