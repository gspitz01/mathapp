import { Component, OnInit } from '@angular/core';
import { RouterCard } from '../shared/models/router-card';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  routerCards = [
    new RouterCard("basics", "/basics", "Basics"),
    new RouterCard("fractions", "/fractions", "Fractions")
  ];

  constructor() { }

  ngOnInit() {
  }

}
