import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import { ServerService } from './../server.service'

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  movie = null
  constructor(public router:Router, private serverService: ServerService) {
    let curMovieId = this.serverService.getCurrentMovieId()
    if (!curMovieId) {
      this.router.navigate(['movies/list'])
    } else {
      this.serverService.getMovie(curMovieId).subscribe((movie) => {
        // this.showLoader = true
        this.movie = movie
        if (!this.movie) {
          alert("Movie not found")
          this.router.navigate(['movies/list'])
        }
      })
    }
  }

  ngOnInit() {
  }

}
