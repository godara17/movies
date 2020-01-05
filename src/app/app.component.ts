import { Component, ViewChild, ViewChildren, Input, Output, EventEmitter, OnInit, QueryList } from '@angular/core'
import {Router} from '@angular/router'
import { ServerService } from './server.service'


// @Component({
//   selector: 'custom-btn',
//   template: `<button (click)="handleClick()" [ngClass]="[btnStyle]">{{button.name}} </button>`,
//   styleUrls: ['./app.component.css']
// })
// export class CustomButton {
//   @Input('button') button: any
//   @Input('btnStyle') btnStyle: any
//   @Output() selectedButton: EventEmitter<string> = new EventEmitter<string>()

//   constructor(private serverService: ServerService) { }

//   ngAfterContentInit() {
//     if (this.button && this.button.id == this.serverService.activeScreen) {
//       this.btnStyle = "category_btn btn-active"
//     }
//   }

//   handleClick() {
//     this.selectedButton.emit(this.button["id"])
//   }
// }

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
  // providers:[ServerService]
})
export class AppComponent {
  title = 'Golbol';
  activeScreen = "SHOW_MOVIES";

  constructor(
    public router:Router, 
    private serverService: ServerService) {
    }

  ngOnInit() {
    this.navScreen()
  }

  navScreen() {
    if (this.serverService.activeScreen == "ADD_MOVIE") {
      this.activeScreen = "ADD_MOVIE"
      this.router.navigate(['movie/create'])
    } else if (this.serverService.activeScreen == "SHOW_MOVIES") {
      this.activeScreen = "SHOW_MOVIES"
      this.router.navigate(['movies/list'])
    }
  }

  addMovie(event) {
    this.serverService.activeScreen = "ADD_MOVIE"
    this.navScreen()
  }

  showMovies(event) {
    this.serverService.activeScreen = "SHOW_MOVIES"
    this.navScreen()
  }
}
