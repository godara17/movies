import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'loader',
  template: `
  <div class="spinner">
    <div class="bounce1"></div>
    <div class="bounce2"></div>
    <div class="bounce3"></div>
  </div>
  `,
  styleUrls: ['./utility.component.css']
})
export class LoaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
