import { Component, OnInit } from '@angular/core'
import {Router} from '@angular/router'
import { ServerService } from './../server.service'


@Component({
  selector: 'app-create-movie',
  templateUrl: './create-movie.component.html',
  styleUrls: ['./create-movie.component.css']
  // providers:[ServerService]
})
export class CreateMovieComponent implements OnInit {

  result: any
  movie = {
     name: '',
     desc: '',
     release_year: '',
     directors: '',
     cast: '',
     poster: ''
  }
  showLoader: boolean

  constructor(
    public router:Router, 
    private serverService: ServerService) {
      this.showLoader = false
    }

  ngOnInit() {
  }

  createMovie() {
    this.showLoader = true
    this.serverService.createMovie(this.movie)
    .subscribe(result => {
      this.result = result
      this.showLoader = false
      if(result.str === 'error'){
        alert("Failed to add movie")
      } else{
        this.router.navigate(['movies/list'])
      }
    })
  }

  uploadPoster() {

  }
}
