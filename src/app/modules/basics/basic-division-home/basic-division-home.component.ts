import { Component, OnInit } from '@angular/core';
import { NUMBER_NAMES } from 'src/app/core/domain/models/constants';
import { RouterCard } from 'src/app/core/domain/models/router-card';

const divisionPath = "/fundamentals/division/";

@Component({
  selector: 'app-basic-division-home',
  templateUrl: './basic-division-home.component.html',
  styleUrls: ['./basic-division-home.component.scss']
})
export class BasicDivisionHomeComponent implements OnInit {

  routerCards = [];

  constructor() {
    for (let roundLevelName of NUMBER_NAMES) {
      let lowerCase = roundLevelName.toLocaleLowerCase()
      this.routerCards.push(new RouterCard("division-" + lowerCase, divisionPath + lowerCase, "By " + roundLevelName));
    }
  }

  ngOnInit() {
  }

}
