import { Component, OnInit } from '@angular/core';
import cssVars from 'css-vars-ponyfill';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
  ) {}

  async ngOnInit() {

    cssVars({
      shadowDOM: true,
      include: 'style',
      onlyLegacy: false
    });
  }

}
