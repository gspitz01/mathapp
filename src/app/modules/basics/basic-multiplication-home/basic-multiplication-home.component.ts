import { Component, OnInit } from '@angular/core';
import { RouterCard } from 'src/app/core/domain/models/router-card';
import { PLURAL_NUMBER_NAMES } from 'src/app/core/domain/models/constants';

const multiPath = "/fundamentals/multiplication/";

@Component({
  selector: 'app-basic-multiplication-home',
  templateUrl: './basic-multiplication-home.component.html',
  styleUrls: ['./basic-multiplication-home.component.scss']
})
export class BasicMultiplicationHomeComponent implements OnInit {

  routerCards = [];

  constructor() {
    for (let roundLevelName of PLURAL_NUMBER_NAMES) {
      let lowerCase = roundLevelName.toLocaleLowerCase()
      this.routerCards.push(new RouterCard("multiplication-" + lowerCase, multiPath + lowerCase, roundLevelName));
    }
  }

  ngOnInit() {
  }

}
