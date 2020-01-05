import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateMovieComponent } from './create-movie/create-movie.component';
import { MoviesListComponent } from './movies-list/movies-list.component';
import { MovieComponent } from './movie/movie.component';


const routes: Routes = [
  {
    path: 'movie/details',
    component: MovieComponent
  },
  {
    path: 'movies/list',
    component: MoviesListComponent
  },
  {
    path: 'movie/create',
    component: CreateMovieComponent
  },
  {
    path: '',
    redirectTo: 'movies/list',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
