import { Component, OnInit } from '@angular/core';
import { ORDINAL_NUMBER_NAMES } from 'src/app/core/domain/models/constants';
import { RouterCard } from 'src/app/core/domain/models/router-card';

const multiPath = '/fundamentals/exponentiation/';

@Component({
  selector: 'app-exponentiation-home',
  templateUrl: './exponentiation-home.component.html',
  styleUrls: ['./exponentiation-home.component.scss']
})
export class ExponentiationHomeComponent implements OnInit {

  routerCards = [];

  constructor() {
    for (let i = 0; i < 3; i++) {
      const roundLevelName = ORDINAL_NUMBER_NAMES[i];
      const lowerCase = roundLevelName.toLocaleLowerCase();
      this.routerCards.push(new RouterCard('exponentiation-' + lowerCase, multiPath + lowerCase, roundLevelName + ' Power'));
    }
  }

  ngOnInit() {
  }

}
