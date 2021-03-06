import { Component, OnInit } from '@angular/core';
import { RouterCard } from '../core/domain/models/router-card';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  routerCards = [
    new RouterCard('fundamentals', '/fundamentals', 'Fundamentals'),
    new RouterCard('fractions', '/fractions', 'Fractions'),
    new RouterCard('baseline', '/baseline', 'Baseline Test')
  ];

  constructor() { }

  ngOnInit() {
  }

}
